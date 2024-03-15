import React from 'react'
import img1 from "../../assets/house12.jpg"
import axios from 'axios'

const AddProperty = () => {
    // try{
    //     // const res=await axios.post("/property/add-property",{})
    //     // if(res.data.message="User not logged in");
    // }
    // catch(err){
    //     console.log(err);
    // }
    // 
    return (
        <main className='p-28 pt-10 w-full h-full '>
            <h1 className='text-[var(--color4)] text-2xl font-semibold p-1 pb-5'> Add Property</h1>
            <form action="" className='flex flex-row gap-10'>
                <div className='flex-1 flex flex-col gap-5'>
                    {/* max length and min length specifies the maximum and minimum number of characters allowed in the input element */}
                    <input placeholder="Name" type="text" className='border rounded-md p-2' id='name' maxLength='62' minLength='10' required/>
                    <textarea placeholder="Address" type="text" className='border rounded-md p-2' id='address' required></textarea>
                    <textarea placeholder="Description" type="text" className='border rounded-md p-2' id='description' required></textarea>
                    
                    <div className='flex gap-6 align-middle'>
                        <p className='inline'>Type: </p>
                        <div className='flex gap-2'>
                            <input className='w-4' type="checkbox" id='sell'/>
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input className='w-4' type="checkbox" id='rent'/>
                            <span>Rent</span>
                        </div>
                    </div>
                    <div className='flex gap-24'>
                        <div className='flex items-center gap-2'>
                            <p> Price: </p>
                            <input className='p-2 border-[var(--color2)] rounded-lg max-w-24' type='number' id="price" required />
                        </div>
                        <div className='flex items-center gap-2'>
                            <div>
                                <p> Area: </p>
                                <p className='text-sm'>(in sqft)</p>
                            </div>
                            <input className='p-2 border-[var(--color2)] rounded-lg max-w-24' type='number' id="price" required />
                        </div>
                    </div>
                    <div className='flex gap-16'>
                        <div className='flex items-center gap-2'>
                            <p> No. of bedrooms </p>
                            <input className='p-2 border-[var(--color2)] rounded-lg max-w-12' max='10' min='1' type='number' id="bedrooms" placeholder='1' required />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p> No. of bathrooms </p>
                            <input className='p-2 border-[var(--color2)] rounded-lg max-w-12' max='10' min='1' type='number' id="bathrooms" placeholder='1' required />
                        </div>
                    </div>
                    
                </div>
                <div className='flex-1 flex flex-col gap-4'>
                    <p className='inline font-semibold'> Amenities </p>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input className='w-4' type="checkbox" id='parking'/>
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input className='w-4' type="checkbox" id='garden'/>
                            <span>Garden</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input className='w-4' type="checkbox" id='theatre'/>
                            <span>Mini Theatre</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input className='w-4' type="checkbox" id='tennis'/>
                            <span>Tennis Court</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input className='w-4' type="checkbox" id='furnished'/>
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 pt-8'>
                        <p className='font-semibold'>
                            Upload images: 
                            <span className='text-[var(--color7)] text-[14px]'> The first image will also be the cover image.</span>
                        </p>
                        <div className='flex flex-row items-center justify-between'>
                            <input type="file" accept="image/*" multiple/>
                            <button className='border-[var(--color4)] border-[2px] text-[var(--color6)] rounded-xl p-[8px] px-[12px] cursor-pointer hover:bg-[var(--color4)] hover:text-[var(--color1)]'>Upload</button>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='bg-[var(--color4)] text-[var(--color1)] border-0 rounded-3xl p-[12px] px-12 cursor-pointer' type='submit'>Add Property</button>
                    </div>
                </div>

            </form>
        </main>
    )
}

export default AddProperty
