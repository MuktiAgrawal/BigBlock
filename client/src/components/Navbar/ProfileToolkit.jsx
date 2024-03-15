import React from 'react'
import styles from "./toolkit.module.css"
import AddProperty from './AddProperty'
import {Link} from "react-router-dom"
const ProfileToolkit = ({ handleLogout,switchToLogin, onMouseEnter, onMouseLeave }) => {
    return (
        <div className={styles.container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <ul className={`${styles.outer}`}>
                <li>
                    <Link to="/add-property">
                        Add property
                    </Link>
                </li>
                <li>Bookings</li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    )
}


export default ProfileToolkit;
