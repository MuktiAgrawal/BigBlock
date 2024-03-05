import styles from "./styles.module.css"
import house9 from "../../../assets/house9.jpg"
import { IoMdLocate } from "react-icons/io";
import MapComponent from './MapComponent';
import {useState} from "react";
const Landing=()=>{

    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const handleMapMarkerClick = (position) => {
        // Here, you can use a geocoding service to get the address based on the position.
        // For simplicity, let's assume you have a geocoding function.
        const address = geocodeFunction(position.lat, position.lng);
        setSelectedAddress(address);
        console.log(selectedAddress);
    };
    // Example geocoding function (replace with your actual implementation)
    const geocodeFunction = async (lat, lng) => {
    // Implement your geocoding logic here
    // This can be an API call to a geocoding service like Google Maps Geocoding API
    // Return the address or other relevant information
        return `Address for ${lat}, ${lng}`;
    };
    return (
        <div className={styles.landing}>    
            <div className={styles.form}>
                <h1 className="p-[6px] text-[var(--color5)] text-[34px]">FIND YOUR DREAM HOUSE</h1>
                <p className={styles.form_tagline}>How often have you driven down a street and seen a home that was exactly what you always wanted? It's true, we all have an image of our perfect dream home, and we can help you find it!</p>
                <form className={styles.search_bar}>
                    <input type="text" placeholder="Search for a country/city" className={styles.search_input}/>
                    <button onClick={() => setIsMapOpen(true)} className={styles.location_button}><IoMdLocate className={styles.location_icon}/></button>
                    {isMapOpen && (
                        <div>
                            <MapComponent onMarkerClick={handleMapMarkerClick} />
                            <button onClick={() => setIsMapOpen(false)}>Close Map</button>
                        </div>
                    )}
                </form>
                <div className={styles.type_div}>
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
                <div className={styles.search_button_div}>
                    <button type="submit" className={styles.search}> Search </button>
                </div>
            </div>
            <div className={styles.landing_house_div}>
                <img className={styles.landing_house_img} src={house9} alt="img"/>
            </div>
        </div>
    )
}
export default Landing;