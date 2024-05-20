import React from 'react'
import leftComma from "../../assets/quotation-mark (2).png"
import rightComma from "../../assets/quotation-mark (3).png"
import person1 from "../../assets/person1.jpg"
import person2 from "../../assets/person2.jpg"
import person3 from "../../assets/person3.jpg"

const Testimonials = () => {
    return (
        <div className='mb-10' id="testimonials">
            <div className='font-semibold text-3xl flex items-center justify-center'>
                <span className='h-0.5 w-40 bg-[var(--color11)] mr-2'></span> 
                Testimonials
                <span className='h-0.5 w-40 bg-[var(--color11)] ml-2'></span>
            </div>
            <div className='flex m-8'> 
                <div className='bg-white m-4 p-6 flex flex-col justify-between'>
                    <div className='flex flex-row'>
                        <div className='relative p-10 pt-6 mb-4'>
                            <img src={leftComma} className='h-8 absolute top-0 -left-3'/>
                            The professionalism and dedication of the team at [Your Real Estate Company] were outstanding. They went above and beyond to ensure we got the best deal possible.
                            <img src={rightComma} className='h-8 absolute right-0 bottom-5'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-end'>
                        <div className='flex flex-col mr-4'>
                            <p className='text-[14px]'>Michael Brown</p>
                            <span className='text-[13px]'>Miami, FL</span>
                        </div>
                        <img src={person3} className='h-14 w-14 rounded-full mr-5'/>
                    </div>
                </div>
                <div className='bg-white m-4 p-6 flex flex-col justify-between'>
                    <div className='flex flex-row'>
                        <div className='relative p-10 pt-6 mb-4'>
                            <img src={leftComma} className='h-8 absolute top-0 -left-3'/>
                            As a first-time homebuyer, I had many questions and concerns. The team at Big Block was incredibly patient and knowledgeable. They made the entire process so easy.
                            <img src={rightComma} className='h-8 absolute right-0 bottom-5'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-end'>
                        <div className='flex flex-col mr-4'>
                            <p className='text-[14px]'>Jane Smith</p>
                            <span className='text-[13px]'>Los Angeles, CA</span>
                        </div>
                        <img src={person2} className='h-14 w-14 rounded-full mr-5'/>
                    </div>
                </div>
                <div className='bg-white m-4 p-6 flex flex-col justify-between'>
                    <div className='flex flex-row'>
                        <div className='relative p-10 pt-6 mb-4'>
                            <img src={leftComma} className='h-8 absolute top-0 -left-3'/>
                            Working with Big Block was a fantastic experience. They helped us find our dream home in no time. The process was smooth and stress-free. Highly recommend!
                            <img src={rightComma} className='h-8 absolute right-0 bottom-5'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-end'>
                        <div className='flex flex-col mr-4'>
                            <p className='text-[14px]'>John Doe</p>
                            <span className='text-[13px]'>New York, NY</span>
                        </div>
                        <img src={person1} className='h-14 w-14 rounded-full mr-5'/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Testimonials
