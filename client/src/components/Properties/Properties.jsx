import React from 'react'
import styles from "./styles.module.css"
import { FaLocationDot } from "react-icons/fa6";
import img1 from "../../assets/house1.jpg"

const Properties = () => {
  return (
    <div>
      <h1 className="text-center font-bold">Properties</h1>
      <div className='grid '>
        <div className={`${styles.card} h-52 w-60`}>
          <img src={img1}/>
          <div>
            <FaLocationDot className={`${styles.location_icon}`} />
            <p></p> 
            {/* Location */}
          </div>
          <p></p>
          {/* description */}
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Properties
