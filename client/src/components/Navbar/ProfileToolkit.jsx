import React from 'react'
import styles from "./toolkit.module.css"
import AddProperty from './AddProperty'

const ProfileToolkit = ({handleLogout}) => {
    return (
        <div className={styles.container}>
            <ul className={`${styles.outer}`}>
                <li onClick={AddProperty}> Add property</li>
                <li>Bookings</li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    )
}

export default ProfileToolkit;
