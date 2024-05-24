import React from 'react'
import { useState,useEffect } from 'react';
import {toast } from 'react-toastify';
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import host from "../../host.js"

const UpdateProperty = () => {
    const [sellChecked, setSellChecked] = useState(false);
    const [rentChecked, setRentChecked] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showImages, setShowImages] = useState(false);
    const [propertyType, setPropertyType] = useState("");
    const [accessToken, setToken] = useState(() => localStorage.getItem('jwtAccessToken') || "");
    const [refreshToken, setRefToken] = useState(() => localStorage.getItem('jwtRefreshToken') || "");
    const [uploading, setUploading] = useState(false);
    const navigate=useNavigate();
    let responseData={};
    const [formData, setFormData] = useState({
        name: "",
        description:"",
        address:"",
        buy_price:"",
        rent_price:"",
        area:"",
        bathrooms:"",
        bedrooms:"",
        furnished:false,
        parking:false,
        garden:false,
        tennis:false,
        theatre:false,
        type:"",
        imageUrls:[],
        userRef:""
    });

    const {userId,propertyId}=useParams();

    const handlePropertyTypeChange = (event) => {
        setPropertyType(event.target.value);
        setFormData({...formData,"type":event.target.value});
        if(event.target.value=="rent"){
            setRentChecked(!rentChecked);
            setSellChecked(false);
        }
        else{
            setSellChecked(!sellChecked);
            setRentChecked(false);
        }
    };

    const handlePriceChange = (event) => {
        const price = Number(event.target.value);
        if(propertyType === "rent") {
            setFormData({...formData, "rent_price": price, "buy_price": ""});
        } else {
            setFormData({...formData, "buy_price": price, "rent_price": ""});
        }
    };
    

    const updatePropertyData = async (formData) => {
        // console.log("inside update")
        try {
            if(accessToken){
                responseData = await axios.post(`${host.apiUrl}/property/my-property/updateProperty/${propertyId}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Refresh-token':refreshToken
                    }
                });
                if(responseData.status==201){
                    toast("Successfully updated property", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        navigate(`/property/my-property/${userId}`);
                }
                setToken(responseData?.data?.accessToken);
            }
            else{
                toast("Please login first.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        if ((formData.imageUrls.length>=3 && formData.imageUrls.length<=10) && (sellChecked || rentChecked)) {
            console.log("form updated successfully");
            updatePropertyData(formData);
        } 
        else {
            if(!sellChecked && !rentChecked){
                toast(`Select sell or rent`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            if(formData.imageUrls.length>10){
                toast(`Remove ${formData.imageUrls.length-10} images to submit form`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            if(formData.imageUrls.length<3){
                toast(`Upload ${3-formData.imageUrls.length} more images to submit form`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            console.log("Please fill the details correctly.");
        }
    };

    const getPropertyData = async () => {
        try {
            const response = await axios.get(`${host.apiUrl}/property/each/${propertyId}`);
            if(response.status===200){
                setFormData(response.data.property);
                // setSelectedImages(response.data.property.imageUrls)
                if(response.data.property.imageUrls.length>0)
                    setShowImages(true);
                if(response.data.property.buy_price) {
                    setSellChecked(true);
                    setRentChecked(false);
                    setPropertyType("sell");
                }
                else if(response.data.property.rent_price) {
                    setRentChecked(true);
                    setSellChecked(false);
                    setPropertyType("rent");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(()=>{
        getPropertyData()
    },[propertyId])

    const handleImages = async () => {
        // console.log("Inside handle image")
        try{
            const imageData = new FormData();
            selectedImages.forEach((image) => {
                imageData.append('images', image);
            });
            setSelectedImages([]);
            const res=await axios.post(`${host.apiUrl}/property/upload-images`,imageData);
            const imageUrls=res?.data?.imageUrls;
            const updatedUrls=[...formData.imageUrls,...imageUrls];
            setFormData({
                ...formData,
                "imageUrls":updatedUrls
            })
            return imageUrls;
        }
        catch(err){
            console.log(err);
        }
    };

const handleUpload = async () => {
    try {
        setUploading(true); // Set uploading state to true when starting upload
        const imageUrls = await handleImages();
        if (imageUrls) {
            console.log("Urls retrieved");
        } else {
            console.log("Error retrieving image URLs.");
        }
        setShowImages(true);
        if (formData.imageUrls.length > 10) {
            toast(`Remove ${formData.imageUrls.length - 10} images to submit form`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    } finally {
        setUploading(false); // Reset uploading state to false when upload finishes
    }
};

    const handleImageRemove=(ind)=>{
        const updatedImages = formData.imageUrls.filter((image, index) => index !== ind);
        setFormData({
            ...formData,
            "imageUrls":updatedImages
        })
    }

    return (
        <main className='p-28 pt-10 w-full h-auto '>
            <h1 className='text-[var(--color4)] text-2xl font-semibold p-1 pb-5'> Update Property</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" action="" className='flex flex-col gap-10 sm:flex-row'>
                <div className='flex-1 flex flex-col gap-5'>
                    {/* max length and min length specifies the maximum and minimum number of characters allowed in the input element */}
                    <input value={formData.name} onChange={handleInput} name="name" placeholder="Name" type="text" className='border rounded-md p-2' id='name' maxLength='62' minLength='10' required/>
                    <textarea value={formData.address} onChange={handleInput} name="address" placeholder="Address" type="text" className='border rounded-md p-2' id='address' required></textarea>
                    <textarea value={formData.description} onChange={handleInput} name="description" placeholder="Description" type="text" className='border rounded-md p-2' id='description' required></textarea>
                    <div className='flex flex-col items-start gap-6'>
                        <div className='flex flex-row gap-2'>
                            <p className='inline'>Type: <span className='text-sm text-[var(--color7)]'>(Select one)</span> </p>
                            <div className='flex gap-2'>
                                <input type="radio" value="sell" checked={propertyType === "sell"} onChange={handlePropertyTypeChange} name="sell" className='w-4' />
                                <span>Sell</span>
                            </div>
                            <div className='flex gap-2 '>
                                <input type="radio" value="rent" checked={propertyType === "rent"} onChange={handlePropertyTypeChange} name="rent" className='w-4' />
                                <span>Rent</span>
                            </div>
                        </div>
                        {sellChecked &&
                            <div className='flex items-center gap-2'>
                                <div>
                                    <p>Price: </p>
                                    <p className='text-sm'>(in $)</p>
                                </div>
                                <input value={formData.buy_price} name="buy_price" className='p-2 border-[var(--color2)] rounded-lg max-w-24' type='number' id="buy_price" onChange={handlePriceChange} required />
                            </div>
                        }
                        {rentChecked &&
                            <div className='flex items-center gap-2'>
                                <div>
                                    <p>Price: </p>
                                    <p className='text-sm'>(in $/month)</p>
                                </div>
                                <input value={formData.rent_price} name="rent_price" className='p-2 border-[var(--color2)] rounded-lg max-w-24' type='number' id="rent_price" onChange={handlePriceChange} required />
                            </div>
                        }
                    </div>
                    <div className='flex gap-24'>
                        <div className='flex items-center gap-2'>
                            <div>
                                <p> Area: </p>
                                <p className='text-sm'>(in sqft)</p>
                            </div>
                            <input onChange={handleInput} value={formData.area} name="area" className='p-2 border-[var(--color2)] rounded-lg max-w-24' type='number' id="area" required />
                        </div>
                    </div>
                    <div className='flex gap-16'>
                        <div className='flex items-center gap-2'>
                            <p> No. of bedrooms </p>
                            <input onChange={handleInput} value={formData.bedrooms} name="bedrooms" className='p-2 border-[var(--color2)] rounded-lg max-w-12' max='10' min='1' type='number' id="bedrooms" required />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p> No. of bathrooms </p>
                            <input onChange={handleInput} value={formData.bathrooms} name="bathrooms" className='p-2 border-[var(--color2)] rounded-lg max-w-12' max='10' min='1' type='number' id="bathrooms" required />
                        </div>
                    </div>
                    
                </div>
                <div className='flex-1 flex flex-col gap-4'>
                    <p className='inline font-semibold'> Amenities </p>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input onChange={handleInput} checked={formData.parking} name="parking" className='w-4' type="checkbox" id='parking'/>
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input onChange={handleInput} checked={formData.garden} name="garden" className='w-4' type="checkbox" id='garden'/>
                            <span>Garden</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input onChange={handleInput} checked={formData.theatre} name="theatre" className='w-4' type="checkbox" id='theatre'/>
                            <span>Mini Theatre</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input onChange={handleInput} checked={formData.tennis} name="tennis" className='w-4' type="checkbox" id='tennis'/>
                            <span>Tennis Court</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input onChange={handleInput} checked={formData.furnished} name="furnished" className='w-4' type="checkbox" id='furnished'/>
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 pt-8'>
                        <p className='font-semibold'>
                            Upload images: 
                            <span className='text-[var(--color7)] text-[14px]'> The first image will also be the cover image. (Maximum: 10 Minimum: 3)</span>
                        </p>
                        <div className='flex flex-row items-center justify-between'>
                            <input name="imageUrls" type="file" accept="image/*" id="images" onChange={(e)=>setSelectedImages([...selectedImages,...e.target.files])} multiple required={formData.imageUrls.length < 1}/>
                            <button onClick={handleUpload} type='button' disabled={uploading} className='border-[var(--color4)] border-[2px] text-[var(--color6)] rounded-xl p-[8px] px-[12px] cursor-pointer hover:bg-[var(--color4)] hover:text-[var(--color1)]'>
                                {uploading?"Uploading...":"Upload"}</button>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                        {showImages && formData.imageUrls.map((image, index) => (
                            <div className='relative' key={index}>
                                <img src={image} className='h-[100px] w-[90px]' />
                                <button className='z-10 absolute text-lg top-0 right-0 text-[var(--color4)] hover:scale-150 transition-transform duration-100' onClick={() => handleImageRemove(index)} type='button'><IoCloseSharp /></button>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='bg-[var(--color4)] text-[var(--color1)] border-0 rounded-3xl p-[12px] px-12 cursor-pointer' type='submit'>Update Property</button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default UpdateProperty;
