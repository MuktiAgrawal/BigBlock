import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import garden from "../../assets/gardening (1).png";
import theatre from "../../assets/theatre.png";
import furnished from "../../assets/cabinet.png";
import tennis from "../../assets/tennis.png";
import parking from "../../assets/garage.png";
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import contactImage from "../../assets/pexels-lina-3639540.jpg";
import Footer from '../Home/Footer';

const IndividualProperty = () => {
    const { propertyId } = useParams();
    const [isValidId, setIsValidId] = useState(false);
    const [propertyData, setPropertyData] = useState(null);
    const [index, setIndex] = useState(0);
    const [remImages, setRemImages] = useState(0);
    const [propertyOwner, setPropertyOwner] = useState();
    const [propertyOwnerEmail,setPropertyOwnerEmail]=useState("");
    const [propertyOwnerData,setPropertyOwnerData]=useState();
    const [canContact, setCanContact] = useState(false);
    const { userDataResponse } = useAuth();
    const [formData, setFormData] = useState({
        mobile: "",
        message: ""
    });

    const getPropertyData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/property/each/${propertyId}`);
            if (response.status === 200) {
                setIsValidId(true);
                setPropertyOwner(response.data.property.userRef);
                setPropertyData(response?.data?.property);
                setRemImages(response?.data?.property?.imageUrls?.length - 3);
                const res = await axios.get(`http://localhost:5000/user/user-data-without-auth?propertyOwner=${response.data.property.userRef}`);
                setPropertyOwnerData(res.data);
                setPropertyOwnerEmail(res.data?.email);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const slideLeft = () => {
        setIndex(index - 1);
    };

    const slideRight = () => {
        setIndex(index + 1);
    };

    useEffect(() => {
        getPropertyData();
    }, [propertyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "mobile") {
            if (!/^\d{10}$/.test(value)) {
                e.target.setCustomValidity("Mobile number should be exactly 10 digits");
            } else {
                e.target.setCustomValidity("");
            }
        } else if (name === "message") {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount > 150) {
                e.target.setCustomValidity("Message should not exceed 150 words");
            } else {
                e.target.setCustomValidity("");
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleContact = (event) => {
        // console.log(formData);
        event.preventDefault();
        // console.log(userDataResponse._id);
        // console.log(propertyOwner);
        if (!userDataResponse || !propertyOwner) {
            toast("Invalid Credentials", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (userDataResponse._id === propertyOwner) {
            toast("It is your property", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setCanContact(true);
        }
        if(canContact){
            const mailtoLink = `mailto:${propertyOwnerEmail}?subject=Regarding ${propertyData.name}&body=Dear ${propertyOwnerData.name}, %0A%0A${formData.message}%0A%0A${userDataResponse.name}%0A${formData.mobile} `;
            window.open(mailtoLink, "_blank");
        }
    };

    return (
        <div>
            {isValidId && (
                <div>
                    <div className='flex m-12 mt-6 mb-0 h-[450px] max-h-[500px]'>
                        <div className='flex justify-center items-center flex-1'>
                            <div className='relative'>
                                <button className='absolute top-[50%] bg-[var(--color9)] rounded-full text-xl p-2 cursor-pointer' onClick={slideLeft}>
                                    <MdOutlineKeyboardArrowLeft />
                                </button>
                                <img className='h-[440px] w-[600px] m-6 mt-0' src={propertyData?.imageUrls[(index) % propertyData.imageUrls.length]} />
                                <button className='absolute top-[50%] right-0 bg-[var(--color9)] rounded-full text-xl p-2 cursor-pointer' onClick={slideRight}>
                                    <MdKeyboardArrowRight />
                                </button>
                            </div>
                        </div>
                        <div className='flex-[0.5] flex flex-col h-[400px] max-h-[450px] mt-2'>
                            <div className='flex-1 pt-0 p-6'>
                                <img className='h-[180px] w-[300px]' src={propertyData?.imageUrls[(index + 1) % propertyData.imageUrls.length]} />
                            </div>
                            <div className='relative flex-1 p-6'>
                                <div className='relative w-fit'>
                                    <img className='h-[180px] w-[300px]' src={propertyData?.imageUrls[(index + 2) % propertyData.imageUrls.length]} />
                                    {remImages != 0 && (
                                        <div className='absolute top-0 left-0 h-full w-full flex items-center justify-center z-10 opacity-55 bg-neutral-400'>
                                            +{remImages}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex h-auto p-10 pt-0'>
                        <div className='flex-[0.55] mr-6 '>
                            <div className='flex justify-between items-center'>
                                <h2>{propertyData?.name}</h2>
                                <div className='bg-amber-700 text-[var(--color10)] p-[5px] rounded-lg'>
                                    {propertyData?.buy_price ? "For sale" : "For rent"}
                                </div>
                            </div>
                            <h4>{propertyData?.address}</h4>
                            <div className='flex justify-around border-2 border-[var(--color8)] rounded-2xl p-2 h-28 '>
                                <div className='flex flex-col pr-4 justify-around border-r-2 border-[var(--color8)] mr-4'>
                                    <p>Price</p>
                                    {propertyData.buy_price ? (
                                        <p className='m-0 font-semibold text-lg'>
                                            <span className='text-md'>Rs </span> {propertyData.buy_price}
                                        </p>
                                    ) : (
                                        <p className='m-0 font-semibold text-lg'>
                                            <span className='text-md'>Rs </span> {propertyData.rent_price}
                                            <span className='text-[var(--color11)] text-sm'>/month</span>
                                        </p>
                                    )}
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
                                <div className='flex h-16'>
                                    <img className='m-2 mr-9' src={garden} />
                                    <div className='flex flex-col justify-center'>
                                        <p>Garden</p>
                                        <p>{propertyData?.garden ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className='flex h-16'>
                                    <img className='m-2 mr-9' src={theatre} />
                                    <div className='flex flex-col justify-center'>
                                        <p>Theatre</p>
                                        <p>{propertyData?.theatre ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className='flex h-16'>
                                    <img className='m-2 mr-9' src={parking} />
                                    <div className='flex flex-col justify-center'>
                                        <p>Parking</p>
                                        <p>{propertyData?.parking ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className='flex h-16'>
                                    <img className='m-2 mr-9' src={tennis} />
                                    <div className='flex flex-col justify-center'>
                                        <p>Tennis Court</p>
                                        <p>{propertyData?.tennis ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div className='flex h-16'>
                                    <img className='m-2 mr-9' src={furnished} />
                                    <div className='flex flex-col justify-center'>
                                        <p>Furnished</p>
                                        <p>{propertyData?.furnished ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center text-3xl font-semibold text-amber-700 '>
                        Are you interested?
                    </div>
                    <div className='flex flex-col md:flex-row max-h-[500px] mb-[10vh] justify-center items-center mt-10 m-20'>
                        <div className='flex-1 flex justify-center items-center'>
                            <img className='w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg' src={contactImage} alt="Contact" />
                        </div>
                        <div className='flex-1 mt-10 md:mt-0 md:ml-10'>
                            <p className='text-lg text-[var(--color13)] font-semibold mb-4 text-center md:text-left'>Contact Landlord for {propertyData.name}</p>
                            <form action="" onSubmit={handleContact} className='bg-white shadow-lg p-8 rounded-lg border border-[var(--color11)]'>
                                <p className='text-gray-600 mb-4'>Fill out the form below to inquire about this property or to book a visit.</p>
                                <div className='mb-6'>
                                    <label htmlFor="mobile" className='block text-gray-700'>Mobile number</label>
                                    <input type="tel" name="mobile" onChange={handleInputChange} value={formData.mobile} pattern='^\d{10}$' required className='w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300' />
                                </div>
                                <div className='mb-6'>
                                    <label htmlFor="message" className='block text-gray-700'>Message</label>
                                    <textarea name="message" onChange={handleInputChange} value={formData.message} required className='w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300' />
                                </div>
                                <button type="submit" className='w-full py-2 px-4 bg-[var(--color3)] hover:bg-[var(--color5)] text-white rounded-lg transition-colors duration-300'>Contact Landlord</button>
                                {/* <Link to={`mailto:${propertyOwnerEmail}?subject=Regarding ${propertyData.name}&body=${formData.message}`} className='w-full py-2 px-4 bg-[var(--color3)] hover:bg-[var(--color5)] text-white rounded-lg transition-colors duration-300'>
                                    con
                                </Link> */}
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {!isValidId && (
                <div className='flex justify-center items-center bg-white text-[#b64a32] text-2xl font-bold w-[100vw] h-[60vh]'>
                    Property not found
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default IndividualProperty;
