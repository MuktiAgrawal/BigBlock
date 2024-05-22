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
        // const ele=document.getElementById("home");
        // console.log(ele)
        const element = document.getElementById(sectionToScroll);
        if (element) {
          setTimeout(() => {
            // const offset = window.innerHeight * 0.1; // 10vh
            // console.log(offset)
            // console.log(element.offsetTop)
            // console.log(element.offsetTop-offset);
            // window.scrollTo({top:element.offsetTop-offset,behavior:"smooth"})
            element.scrollIntoView({ behavior: "smooth" });
        }, 200);
        }
      }
    }, [location?.state]);
  
  return (
    <div id="home" className="min-h-lvh">
      <Landing />
      <About id="about" />
      <LatestProperty id="latest-property" />
      <AddYourProperty id="add-your-property" />
      <Testimonials id="testimonials" />
      <Footer />
    </div>
  )
}

export default Home
