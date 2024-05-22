import React,{useEffect} from 'react'
import Landing from './Landing/Landing'
import About from './About'
import Testimonials from './Testimonials'
import LatestProperty from './LatestProperty'
import AddYourProperty from './AddYourProperty'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location=useLocation();
  // const aboutUsRef = useRef(null);
  // const testimonialsRef = useRef(null);
  // const latestPropertyRef = useRef(null);
  // const submitPropertyRef = useRef(null);
  // console.log(location)
    useEffect(() => {
      if (location?.state && location.state?.scrollTo) {
        const sectionToScroll = location.state.scrollTo;
        const element = document.getElementById(sectionToScroll);
        if (element) {
          setTimeout(() => {
            console.log(element.offsetTop);
            element.scrollIntoView({ behavior: "smooth" });
        }, 200);
        }
      }
    }, [location?.state]);
  
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
