import React from 'react'
import Landing from './Landing/Landing'
import About from './About'
import Testimonials from './Testimonials'
import LatestProperty from './LatestProperty'
import AddYourProperty from './AddYourProperty'

const Home = () => {
  return (
    <div className="min-h-lvh">
        <Landing/>
        <About/>
        <LatestProperty/>
        <AddYourProperty/>
        <Testimonials/>
    </div>
  )
}

export default Home
