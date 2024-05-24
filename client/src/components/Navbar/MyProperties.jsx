import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import host from "../../host.js"
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
                const res = await axios.get(`${host.apiUrl}/property/my-property/${userId}`, {
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

    const handleUpdateClick = (propertyId, e) => {
        e.stopPropagation();
        navigate(`/property/my-property/${userId}/updateProperty/${propertyId}`);
    };
    
    const handleDeleteClick = (propertyId, e) => {
        e.stopPropagation();
        setPropertyToDelete(propertyId); 
        setShow(true); 
    };
    
    const handlePropertyClick=(propertyId)=>{
        navigate(`/property/each/${propertyId}`);
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    return (
        <div>
            <h3 className='text-center'>Your Properties</h3>
            <div className='flex flex-col m-6 justify-center items-center '>
                <div className='bg-white shadow-md p-4 max-w-[60vw] '>
                {properties.map((property, index) => (
                    <div className='flex relative items-center w-[55vw] m-2 mb-4 p-4 bg-white shadow-sm border border-[var(--color8)] rounded-lg' onClick={()=>{handlePropertyClick(property._id)}} key={index}>
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
                        {property.buy_price?
                        <div className='font-semibold text-lg justify-start flex flex-[0.4] items-center'>Rs {property.buy_price}</div>
                        :<div className='font-semibold text-lg justify-start flex flex-[0.4] items-center'>Rs {property.rent_price}
                        <span className='text-[var(--color11)] text-sm'>/month</span>
                        </div> 
                        }
                        <button onClick={(e) => handleUpdateClick(property._id, e)} className='z-10 absolute p-1 rounded-sm top-2 right-8 text-lg hover:bg-[var(--color8)]'><MdOutlineModeEditOutline /></button>
                        <button onClick={(e) => handleDeleteClick(property._id, e)} className='z-10 absolute p-1 rounded-sm top-2 right-1 text-lg hover:bg-[var(--color8)]'><RiDeleteBinLine /></button>
                    </div>
                ))}
                </div>
            </div>
            {showConfirmationModal && <ConfirmationModal propertyId={propertyToDelete} closeConfirmationModal={closeConfirmationModal} fetchData={fetchData}/>}
        </div>
    );
};

export default MyProperties;
