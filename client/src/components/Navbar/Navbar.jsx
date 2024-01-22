import styles from "./styles.module.css"
import logo from "../../assets/big-block-high-resolution-logo-transparent1.png"
import {Link} from "react-router-dom";

const Navbar=()=>{
    return (
        <div className={styles.Navbar}>
            
                <img className={styles.logo} src={logo} alt="img"/>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/properties">Properties</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
                <button className={styles.login_button}>Login/Signup</button>
            
        </div>
    )
}
export default Navbar;