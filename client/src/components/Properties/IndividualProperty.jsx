import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import house9 from "../../assets/house14.jpg"
import garden from "../../assets/gardening (1).png"
import theatre from "../../assets/theatre.png"
import furnished from "../../assets/cabinet.png"
import tennis from "../../assets/tennis.png"
import parking from "../../assets/garage.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IndividualProperty = () => {
    const {propertyId}=useParams();
    const [isValidId,setIsValidId]=useState(false);
    const [propertyData, setPropertyData] = useState(null);
    const getPropertyData = async () => {
        // console.log("here")
        try {
            const response = await axios.get(`http://localhost:5000/property/each/${propertyId}`);
            // console.log(response);
            if(response.status===200){
                setIsValidId(true);
                setPropertyData(response?.data?.property);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(()=>{
        getPropertyData();
    },[propertyId,setIsValidId])
    console.log(propertyData);
    return (
        <div>
            {isValidId &&
            <div>
                <Slider
    infinite={true}
    slidesToShow={4}
    slidesToScroll={1}
    dots={true}
    responsive={[
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        }
    ]}
>
    {propertyData.imageUrls.map((imageUrl, index) => (
        <div key={index}>
            <img src={imageUrl} alt={`Slide ${index}`} className='h-60 w-80 m-6'/>
        </div>
    ))}
</Slider>

                <div>
                    <img src={propertyData.imageUrls[0]} className='h-60 w-80 m-6'/>
                </div>
                <div className='flex h-auto p-10'>
                    <div className='flex-[0.55] mr-6 '>
                        <h2>{propertyData.name}</h2>
                        <h4>{propertyData.address}</h4>
                        <div className='grid grid-cols-7 border-2 border-[var(--color8)] rounded-2xl p-2 h-28 '>
                            <div className='flex flex-col justify-around'>
                                <p>Price</p>
                                <h4 className='m-0'>{propertyData.buy_price || propertyData.rent_price}</h4>
                            </div>
                            <div className='border-r-2 border-[var(--color8)] mr-10'></div>
                            <div className='flex flex-col justify-around  '>
                                <p>Bedrooms</p>
                                <h4 className='m-0'>{propertyData.bedrooms}</h4>
                            </div>
                            <div className='border-r-2 border-[var(--color8)] mr-10'></div>
                            <div className='flex flex-col justify-around'>
                                <p>Bathrooms</p>
                                <h4 className='m-0'>{propertyData.bathrooms}</h4>
                            </div>
                            <div className='border-r-2 border-[var(--color8)] mr-10'></div>
                            <div className='flex flex-col justify-around '>
                                <p>Area</p>
                                <h4 className='m-0'>{propertyData.area} sqft</h4>
                            </div>
                        </div>
                        <h3>Description</h3>
                        <p>{propertyData.description}</p>

                    </div>
                    <div className='flex-[0.45] border rounded-2xl border-[var(--color8)] p-6 pt-0 ml-10 mt-10'>
                        <h4>Facts and features</h4>
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={garden}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Garden</p>
                                    <p>{propertyData.garden?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={theatre}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Theatre</p>
                                    <p>{propertyData.theatre?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={parking}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Parking</p>
                                    <p>{propertyData.parking?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={tennis}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Tennis Court</p>
                                    <p>{propertyData.tennis?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={furnished}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Furnished</p>
                                    <p>{propertyData.furnished?"Yes":"No"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            {!isValidId &&
            <div className='flex justify-center items-center bg-white text-[#b64a32] text-2xl font-bold w-[100vw] h-[60vh]'>
                Property not found
            </div>
            }
        </div>
    )
}

export default IndividualProperty;
