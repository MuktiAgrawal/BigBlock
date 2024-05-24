import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { LiaBedSolid } from "react-icons/lia";
import { LiaBathSolid } from "react-icons/lia";
import { SlSizeFullscreen } from "react-icons/sl";
import {useNavigate} from 'react-router-dom';

const LatestProperty = () => {
    const [properties,setProperties]=useState([]);
    const navigate=useNavigate();
    const getProperty=async ()=>{
        try{
            const res=await axios.get(`http://localhost:5000/property?page=2&perPage=3`);
            if(res.status==200){
                setProperties(res?.data?.properties);
            }
        }
        catch(err){
            console.log("Error in retrieving page properties");
            console.log(err);
        }
    }
    useEffect(()=>{
        getProperty();
    },[])
    const openProperty=(propertyId)=>{
        console.log("open property called");
        console.log(propertyId);
        if(propertyId){
            navigate(`/property/each/${propertyId}`);
        }
    }
    return (
        <div id="latest-property">
            <div className='relative'>
                <div className='font-semibold text-3xl flex items-center justify-center'>
                    <span className='h-0.5 w-40 bg-[var(--color11)] mr-2'></span> 
                    Latest Property 
                    <span className='h-0.5 w-40 bg-[var(--color11)] ml-2'></span>
                </div>
                <div className='flex m-14 mt-4 bg-white shadow-md'>
                    {properties.map((property,index)=>(
                        <div key={index} onClick={()=>openProperty(property._id)} className='flex-1 flex flex-col m-6 mr-3 bg-white shadow-sm border border-[var(--color8)] cursor-pointer'>
                            <div className='relative'>
                                <img className='h-[240px] w-full' src={property.imageUrls[0]}/>
                                <div className='absolute top-0 right-0 text-white bg-[var(--color3)] p-2'>For {property.buy_price?"sale":"rent"} </div>
                            </div>
                            <div className='flex bg-[var(--color10)] p-3  justify-between items-center text-[14px] text-[var(--color5)]'>
                                <SlSizeFullscreen className='text-24px'/>
                                <p>{property.area} sqft</p>
                                <LiaBathSolid className='text-[24px]'/>
                                <p>{property.bathrooms} Bathrooms</p>
                                <LiaBedSolid className='text-[24px]'/>
                                <p>{property.bedrooms} Bedrooms</p>
                            </div>
                            <div className='flex flex-col items-start p-2 pl-4 pr-4 text-[15px]'>
                                <div className='flex font-semibold text-[16px] mt-2 justify-between w-full'>
                                    <p className=''>{property.name}</p>
                                    {property.buy_price?
                                    <p className='text-[var(--color3)]'>Rs {property.buy_price}</p>
                                    : <p className='text-[var(--color3)]'>Rs {property.rent_price}<span>/month</span></p>
                                    }
                                </div>
                                <p className='mt-2'>{property.address}</p>
                                {/* <p>
                                {property.description.split(' ').slice(0, 12).join(' ')}
                                {property.description.split(' ').length > 10 ? ' ...' : ''}
                                </p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LatestProperty
