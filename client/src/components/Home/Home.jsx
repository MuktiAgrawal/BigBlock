import React from 'react'
import Landing from './Landing/Landing'
import styles from "./styles.module.css"
import About from './About/About'
const Home = () => {
  return (
    <div className="min-h-lvh">
        <Landing/>
        <About/>
    </div>
  )
}

export default Home
