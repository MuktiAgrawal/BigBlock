import React from 'react'
import aboutUs from "../../assets/about_us_image.jpg"
const About = () => {
    return (
        <div className='m-14' id="about">
            <div className='font-semibold text-3xl flex items-center justify-center'>
                <span className='h-0.5 w-40 bg-[var(--color11)] mr-2'></span> 
                About Us
                <span className='h-0.5 w-40 bg-[var(--color11)] ml-2'></span>
            </div>
            <div className='flex mt-4'>
                <div className='bg-white flex-1 rounded-lg p-4 mr-10 shadow-md'>
                    <p className='font-semibold text-4xl pt-3 pb-10'>Dwell Well: Connecting Buyers, Sellers, and Renters!</p>
                    <p className='text-[var(--color6)] leading-8 '>At Dwell Well, we're not just about real estate transactions; we're about facilitating dreams. Inspired by the idea that every property holds its own unique narrative, we've built a platform where buyers, sellers, and renters come together to create their next chapter. Whether it's finding that perfect seaside villa to call home or listing your downtown loft for sale, Dwell Well empowers you to navigate the real estate landscape with confidence and ease. Our innovative approach blends cutting-edge technology with personalized service, ensuring that every interaction is not just a transaction but a journey towards realizing your aspirations.</p>
                </div>
                <div className='flex flex-col flex-1 justify-between'>
                    <div className='rounded-lg overflow-hidden mb-6 object-cover shadow-md'>
                        <img className='h-56 w-full' src={aboutUs}/>
                    </div>
                    <div className='bg-white rounded-lg p-4 grid grid-cols-2 gap-4 shadow-md'>
                        <div className=' p-3 rounded-lg '>
                            <p className='font-semibold text-3xl'>600+</p>
                            <p className='text-[var(--color6)]'>Properties sold</p>
                        </div>
                        <div className=' p-3 rounded-lg'>
                            <p className='font-semibold text-3xl'>300+</p>
                            <p className='text-[var(--color6)]'>Properties rented</p>
                        </div>
                        <div className=' p-3 rounded-lg'>
                            <p className='font-semibold text-3xl'>Rs 4.7Cr</p>
                            <p className='text-[var(--color6)]'>Properties worth</p>
                        </div>
                        <div className=' p-3 rounded-lg'>
                            <p className='font-semibold text-3xl'>850+</p>
                            <p className='text-[var(--color6)]'>Positive Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
