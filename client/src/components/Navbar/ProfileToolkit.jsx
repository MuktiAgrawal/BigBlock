import React from 'react'
import styles from "./toolkit.module.css"

const ProfileToolkit = ({handleLogout}) => {
    return (
        <div className={styles.container}>
            <ul className={`${styles.outer}`}>
                <li onClick={handleLogout}>Logout</li>
                <li>Bookings</li>
            </ul>
        </div>
    )
}

export default ProfileToolkit;
