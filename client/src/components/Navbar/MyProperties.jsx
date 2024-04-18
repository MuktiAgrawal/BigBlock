import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";

import ConfirmationModal from './ConfirmationModal';

const MyProperties = () => {
    const { userId } = useParams();
    const [properties, setProperties] = useState([]);
    const accessToken = localStorage.getItem('jwtAccessToken') || '';
    const refreshToken = localStorage.getItem('jwtRefreshToken') || '';
    const [showConfirmationModal, setShow] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null); 
    const navigate=useNavigate();

    const fetchData = async () => {
        try {
            if (accessToken) {
                const res = await axios.get(`http://localhost:5000/property/my-property/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Refresh-token': refreshToken
                    }
                });
                if (res.status === 200) {
                    setProperties(res.data.properties);
                }
            }
        } catch (err) {
            console.log('Error fetching properties:', err);
        }
    };

    const closeConfirmationModal = () => {
        setShow(false);
    };

    const handleDeleteClick = (propertyId) => {
        setPropertyToDelete(propertyId); 
        setShow(true); 
    };

    const handleUpdateClick=(propertyId)=>{
        console.log("here")
        navigate(`/property/my-property/updateProperty/${propertyId}`);
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    return (
        <div>
            <div className='flex flex-col m-6 justify-center items-center'>
                <h3 className=''>Your Properties</h3>
                {properties.map((property, index) => (
                    <div className='flex relative items-center w-[60vw] m-1 p-2 pl-4 pr-6 bg-[var(--color10)] border border-[var(--color9)] rounded-xl' key={index}>
                        <div className='w-[180px]'>
                            <img className='h-[100px] w-[160px]' src={property.imageUrls[0]} alt={property.name} />
                        </div>
                        <div className='flex flex-col items-start pl-8 flex-[0.8]'>
                            <h4 className='m-0 mt-4'>{property.name}</h4>
                            <div className='flex items-center'>
                                <MdLocationOn className='ml-[-3px] mb-[4px] mr-1 text-[var(--color3)]' />
                                <h5>{property.address}</h5>
                            </div>
                        </div>
                        <div className='font-bold'>${property.buy_price ? property.buy_price : property.rent_price + "/month"}</div>
                        <button onClick={()=>handleUpdateClick(property._id)} className='z-10 absolute p-1 rounded-sm top-2 right-8 text-lg hover:bg-[var(--color8)]'><MdOutlineModeEditOutline /></button>
                        <button onClick={() => handleDeleteClick(property._id)} className='z-10 absolute p-1 rounded-sm top-2 right-1 text-lg hover:bg-[var(--color8)]'><RiDeleteBinLine /></button>
                    </div>
                ))}
            </div>
            {showConfirmationModal && <ConfirmationModal propertyId={propertyToDelete} closeConfirmationModal={closeConfirmationModal} fetchData={fetchData}/>}
        </div>
    );
};

export default MyProperties;
