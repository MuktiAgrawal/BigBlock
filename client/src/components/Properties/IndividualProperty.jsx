import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import garden from "../../assets/gardening (1).png"
import theatre from "../../assets/theatre.png"
import furnished from "../../assets/cabinet.png"
import tennis from "../../assets/tennis.png"
import parking from "../../assets/garage.png"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const IndividualProperty = () => {
    const {propertyId}=useParams();
    const [isValidId,setIsValidId]=useState(false);
    const [propertyData, setPropertyData] = useState(null);
    const [index,setIndex]=useState(0);
    const [remImages,setRemImages]=useState(0);
    const getPropertyData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/property/each/${propertyId}`);
            if(response.status===200){
                setIsValidId(true);
                setPropertyData(response?.data?.property);
                setRemImages(response?.data?.property?.imageUrls?.length-3);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const slideLeft=()=>{
        setIndex(index-1);
    }
    const slideRight=()=>{
        setIndex(index+1);
    }

    useEffect(()=>{
        getPropertyData();
    },[propertyId,setIsValidId])

    return (
        <div>
            {isValidId &&
            <div>
                <div className='flex m-12 mt-6 mb-0 h-[450px] max-h-[500px]'>
                    <div className='flex justify-center items-center flex-1'>
                        <div className='relative'>
                            <button className='absolute top-[50%] bg-[var(--color9)] rounded-full text-xl p-2 cursor-pointer' onClick={slideLeft}> <MdOutlineKeyboardArrowLeft /></button>
                            <img className='h-[440px] w-[600px] m-6 mt-0' src={propertyData?.imageUrls[(index)%propertyData.imageUrls.length]}/>
                            <button className='absolute top-[50%] right-0 bg-[var(--color9)] rounded-full text-xl p-2 cursor-pointer' onClick={slideRight}><MdKeyboardArrowRight /></button>
                        </div>
                    </div>
                    <div className='flex-[0.5] flex flex-col h-[400px] max-h-[450px] mt-2'>
                        <div className='flex-1 pt-0 p-6'>
                            <img className='h-[180px] w-[300px]' src={propertyData?.imageUrls[(index+1)%propertyData.imageUrls.length]}/>
                        </div>
                        <div className='relative flex-1  p-6'>
                            <div className='relative w-fit'>
                                <img className='h-[180px] w-[300px]' src={propertyData?.imageUrls[(index+2)%propertyData.imageUrls.length]}/>
                                {(remImages!=0) && <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center z-10 opacity-55 bg-neutral-400'>
                                    +{remImages}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex h-auto p-10 pt-0'>
                    <div className='flex-[0.55] mr-6 '>
                        <div className='flex justify-between items-center'>
                            <h2>{propertyData?.name}</h2>
                            <div className='bg-amber-700 text-[var(--color10)] p-[5px] rounded-lg'>{propertyData?.buy_price?"For sale":"For rent"}</div>
                        </div>
                        <h4>{propertyData?.address}</h4>
                        <div className='flex justify-around border-2 border-[var(--color8)] rounded-2xl p-2 h-28 '>
                            <div className='flex flex-col pr-4 justify-around border-r-2 border-[var(--color8)] mr-4'>
                                <p>Price</p>
                                {propertyData.buy_price?
                                <p className='m-0 font-semibold text-lg'><span className='text-md'>Rs </span> {propertyData.buy_price}</p>
                                :<p className='m-0 font-semibold text-lg'><span className='text-md'>Rs </span> {propertyData.rent_price}
                                <span className='text-[var(--color11)] text-sm'>/month</span>
                                </p>
                                }
                            </div>
                            <div className='flex flex-col justify-around pr-4 border-r-2 border-[var(--color8)] mr-4 '>
                                <p>Bedrooms</p>
                                <p className='m-0 font-semibold text-lg'>{propertyData?.bedrooms}</p>
                            </div>
                            <div className='flex flex-col pr-4 justify-around border-r-2 border-[var(--color8)] mr-4'>
                                <p>Bathrooms</p>
                                <p className='m-0 font-semibold text-lg'>{propertyData?.bathrooms}</p>
                            </div>
                            <div className='flex flex-col pr-4 justify-around  '>
                                <p>Area</p>
                                <p className='m-0 font-semibold text-lg'>{propertyData?.area} sqft</p>
                            </div>
                        </div>
                        <h3>Description</h3>
                        <p>{propertyData?.description}</p>
                    </div>
                    <div className='flex-[0.45] border rounded-2xl border-[var(--color8)] p-6 pt-0 m-10'>
                        <h4>Facts and features</h4>
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={garden}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Garden</p>
                                    <p>{propertyData?.garden?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={theatre}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Theatre</p>
                                    <p>{propertyData?.theatre?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={parking}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Parking</p>
                                    <p>{propertyData?.parking?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={tennis}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Tennis Court</p>
                                    <p>{propertyData?.tennis?"Yes":"No"}</p>
                                </div>
                            </div>
                            <div className='flex h-16' >
                                <img className=' m-2 mr-9' src={furnished}/>
                                <div className='flex flex-col justify-center'>
                                    <p>Furnished</p>
                                    <p>{propertyData?.furnished?"Yes":"No"}</p>
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
