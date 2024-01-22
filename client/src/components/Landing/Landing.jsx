import styles from "./styles.module.css"
import house9 from "../../assets/house9.jpg"
import { IoMdLocate } from "react-icons/io";

const Landing=()=>{
    return (
        <div className={styles.landing}>    
            <div className={styles.form}>
                <h1>FIND YOUR DREAM HOUSE</h1>
                <p className={styles.form_tagline}>How often have you driven down a street and seen a home that was exactly what you always wanted? It's true, we all have an image of our perfect dream home, and we can help you find it!</p>
                <form className={styles.search_bar}>
                    <input type="text" placeholder="Search for a country/city" className={styles.search_input}/>
                    <button className={styles.location_button}><IoMdLocate className={styles.location_icon}/></button>
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