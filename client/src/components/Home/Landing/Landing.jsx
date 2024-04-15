// import styles from "./styles.module.css"
import house9 from "../../../assets/house9.jpg"
import { IoMdLocate } from "react-icons/io";
import MapComponent from './MapComponent';
import {useState} from "react";
const Landing=()=>{
    return (
        <div className='flex relative min-h-[80vh] items-center mt-[6vh]'>    
            <div className='border border-[var(--color4)] min-w-[20vw] p-[10px] flex flex-col w-[28vw] h-[67vh] z-10 left-[14%] absolute backdrop-blur-[5px]'>
                <h1 className="p-[6px] pt-0 pb-0 text-[var(--color5)]">FIND YOUR DREAM HOUSE</h1>
                <p className='text-[var(--color6)] text-[14px] p-2 pt-0'>How often have you driven down a street and seen a home that was exactly what you always wanted? It's true, we all have an image of our perfect dream home, and we can help you find it!</p>
                <form  type="submit" className='flex m-2 p-2 pl-3 bg-white rounded-3xl shadow-md'>
                    <input type="text" placeholder="Search" className='flex-1 border-none outline-none placeholder-[var(--color5)]'/>
                    <button className='border-none bg-[var(--color1)] h-[25px] w-[25px] rounded-full p-[2px] cursor-pointer'>
                        <IoMdLocate className='text-[20px] text-[var(--color5)]'/>
                    </button>
                </form>
                <div className='flex justify-around items-center m-3'>
                    <label>Type:</label>
                    <div>
                        <input type="checkbox"/>
                        <span> Buy </span>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <span> Rent </span>
                    </div>
                </div>
                <div className='flex justify-center items-center translate-y-[8px]'>
                    <button type="submit" className='flex-[0.3] bg-[var(--color4)] text-[var(--color1)] border-none rounded-3xl p-[10px] cursor-pointer '> Search </button>
                </div>
            </div>
            <div className='absolute left-[28%] w-[60vw] h-[80vh]'>
                <img className='w-full h-full object-cover' src={house9} alt="img"/>
            </div>
        </div>
    )
}
export default Landing;