import React from 'react'
import styles from "./toolkit.module.css"
import {Link} from "react-router-dom"
const ProfileToolkit = ({ handleLogout,userId, onMouseEnter, onMouseLeave }) => {
    return (
        <div className={styles.container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <ul className={`${styles.outer}`}>
                {userId &&
                <>
                    <li>
                        <Link to={`/property/add-property/${userId}`}>
                            Add property
                        </Link>
                    </li>
                    <li>
                        <Link to={`/property/my-property/${userId}`}>
                            My properties
                        </Link>
                    </li>
                </>}
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    )
}


export default ProfileToolkit;
