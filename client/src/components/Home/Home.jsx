import React from 'react'
import Landing from './Landing/Landing'
import About from './About'
import Testimonials from './Testimonials'
import LatestProperty from './LatestProperty'
import AddYourProperty from './AddYourProperty'
import Footer from './Footer'

const Home = () => {
  // const aboutUsRef = useRef(null);
  // const testimonialsRef = useRef(null);
  // const latestPropertyRef = useRef(null);
  // const submitPropertyRef = useRef(null);
  
  return (
    <div className="min-h-lvh">
        <Landing/>
        <About/>
        <LatestProperty/>
        <AddYourProperty/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}

export default Home
