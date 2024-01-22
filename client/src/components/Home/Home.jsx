import React from 'react'
import Landing from '../Landing/Landing'
import styles from "./styles.module.css"
const Home = () => {
  return (
    <div className={styles.home}>
        <Landing/>
        <div> About us</div>
    </div>
  )
}

export default Home
