import React from 'react'
import Footer from '../Home/Footer'
import contact_image from "../../assets/contact_us_image1.png"
import { IoCallSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoHome } from "react-icons/io5";

const Contact = () => {
  const backgroundStyle={
    backgroundImage:`url(${contact_image})`
    // backgroundPosition: 'center',
  }
  return (
    <div className='text-[var(--color14)]'>
      <div className="h-[70vh] w-full bg-no-repeat bg-cover bg-bottom flex flex-col justify-center items-center" style={backgroundStyle}>
        <p className='text-[var(--color2)] text-5xl font-bold'>Contact Us</p>
        <p className='text-[var(--color12)] text-lg mt-4 max-w-[60vw] text-center px-4'>
          Have questions about buying, selling, or renting properties? We're here to assist you with all your property needs. Contact us for support, inquiries, or feedback.
        </p>
      </div>
      <div className='flex flex-col lg:flex-row justify-around m-10'>
        <div className='border-r border-[var(--color10)] p-10 flex flex-col justify-around items-center lg:h-[50vh]'>
          <IoHome className='text-4xl mb-2' />
          <p className='text-[var(--color7)] font-semibold'>VISIT US</p>
          <p className='text-[var(--color7)] text-center'>Visit our office for personalized assistance with buying, selling, or renting properties.</p>
          <p>Bangalore, Karnataka, 560001</p>
        </div>
        <div className='border-r border-[var(--color10)] p-10 flex flex-col justify-around items-center lg:h-[50vh]'>
          <IoCallSharp className='text-4xl mb-2' />
          <p className='text-[var(--color7)] font-semibold'>CALL US</p>
          <p className='text-[var(--color7)] text-center'>Call us to speak with our real estate experts for any questions or assistance.</p>
          <p>(+91) 98765 43210</p>
        </div>
        <div className='p-10 flex flex-col justify-around items-center lg:h-[50vh]'>
          <IoMdMail className='text-4xl mb-2' />
          <p className='text-[var(--color7)] font-semibold'>CONTACT US</p>
          <p className='text-[var(--color7)] text-center'>Email us your inquiries or concerns, and we'll respond promptly.</p>
          <p>contact@yourwebsite.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact
