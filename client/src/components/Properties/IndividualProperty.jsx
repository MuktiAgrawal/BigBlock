import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const IndividualProperty = () => {
    const {propertyId}=useParams();
    const [isValidId,setIsValidId]=useState(false);
    const [propertyData, setPropertyData] = useState(null);
        const getPropertyData = async () => {
            console.log("here")
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
    
    return (
        <div>
            {isValidId &&
            <div className='flex h-[100vh]'>
                <div className='flex-[0.55] bg-gray-800'>

                </div>
                <div className='flex-[0.45] bg-slate-500'>

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
