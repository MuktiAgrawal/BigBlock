import React from 'react'
import footerBackground from "../../assets/footer_background2.jpg"
import logo from "../../assets/big-block-high-resolution-logo-transparent1.png"
import instagram from "../../assets/instagram.png"
import facebook from "../../assets/facebook.png"
import linkedin from "../../assets/linkedin.png"
import youtube from "../../assets/youtube.png"
import twitter from "../../assets/twitter.png"

const Footer = () => {
    const backgroundStyle={
        backgroundImage:`url(${footerBackground})`,
    }
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        // console.log(element)
        if (element) {
            element.scrollIntoView({behavior:"smooth"})
            // const offset = 10 * window.innerHeight / 100; // 10vh
            // const elementPosition = element.offsetTop; // Get the top position of the element relative to the document
            // const offsetPosition = elementPosition - offset;
            // console.log(element.offsetTop)
            // window.scrollTo({
            //     top: element.offsetTop,
            //     behavior: 'smooth'
            // });
        }
    };

    return (
        <div className='text-[14px]'>
            <div className='bg-[var(--color5)] h-[60vh] bg-contain pb-10 pr-0 pl-16 pt-28 flex flex-row' style={backgroundStyle}>
                <div className='flex-[1.5] pr-20' >
                    <img src={logo} className='h-12 w-16 mt-8'/>
                    <p className='text-[var(--color10)]  pt-6'>Find more than a house. Discover your perfect home with Big Block - your partner in real estate.</p>
                </div>
                <div className='flex flex-col flex-1 text-[var(--color10)] '>
                    <a className='p-2 cursor-pointer hover:text-[var(--color2)] active:text-[var(--color2)]' onClick={() => scrollToSection("about")}>About us</a>
                    <a className='p-2 cursor-pointer hover:text-[var(--color2)] active:text-[var(--color2)]' onClick={() => scrollToSection("latest-property")}>Latest Property</a>
                    <a className='p-2 cursor-pointer hover:text-[var(--color2)] active:text-[var(--color2)]' onClick={() => scrollToSection("add-your-property")}>Submit Your Property</a>
                    <a className='p-2 cursor-pointer hover:text-[var(--color2)] active:text-[var(--color2)]' onClick={() => scrollToSection("testimonials")}>Testimonials</a>
                    <a className='p-2 cursor-pointer hover:text-[var(--color2)] active:text-[var(--color2)]' href="/properties">All Properties</a>
                </div>
                <div className='flex-1'>
                    <p className=' text-[var(--color10)] text-[17px]'>Follow us on</p>
                    <div className='flex m-3 ml-0 items-center'>
                        <img src={instagram} className='h-5 mr-4'/>
                        <p className='text-[var(--color10)] cursor-pointer hover:text-[var(--color2)]'>Instagram</p>
                    </div>
                    <div className='flex m-3 ml-0 items-center'>
                        <img src={facebook}  className='h-5 mr-4'/>
                        <p className='text-[var(--color10)] cursor-pointer hover:text-[var(--color2)]'>Facebook</p>
                    </div>
                    <div className='flex m-3 ml-0 items-center'>
                        <img src={youtube} className='h-5 mr-4'/>
                        <p className='text-[var(--color10)] cursor-pointer hover:text-[var(--color2)]'>Youtube</p>
                    </div>
                    <div className='flex m-3 ml-0 items-center'>
                        <img src={linkedin} className='h-5 mr-4'/>
                        <p className='text-[var(--color10)] cursor-pointer hover:text-[var(--color2)]'>LinkedIn</p>
                    </div>
                    <div className='flex m-3 ml-0 items-center'>
                        <img src={twitter}  className='h-5 mr-4'/>
                        <p className='text-[var(--color10)] cursor-pointer hover:text-[var(--color2)]'>Twitter</p>
                    </div>
                </div>
            </div>
            <div className='h-[8vh] bg-[var(--color5)] items-center flex justify-center'>
                <p className='text-[var(--color10)]'>&#169; Copyright BigBlock 2024, All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
