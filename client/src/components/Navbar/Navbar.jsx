import styles from "./styles.module.css"
import logo from "../../assets/dwell-well-high-resolution-logo-transparent light.png"
import {Link, useResolvedPath, useMatch} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
import ProfileToolkit from "./ProfileToolkit";
import { useAuth } from "../contexts/AuthContext";

const Navbar=()=>{
    const [isHovered, setIsHovered] = useState(false);
    const { switchToLogin, switchToSignUp, handleCloseModal, showLogin, showSignUp, userDataResponse, handleLogout ,accessToken} = useAuth();
    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutId); // Clear any existing timeout
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        // Set a timeout to hide the toolkit after 200 milliseconds
        const id = setTimeout(() => {
            setIsHovered(false);
        },200);
        setTimeoutId(id);
    };

    return (
        <div className={styles.Navbar}>
            <Link to="/">
                <img className={styles.logo} src={logo} alt="img"/>
            </Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/property">Properties</CustomLink>
                <CustomLink to="/contact">Contact</CustomLink>
            </ul>
            {!accessToken && !userDataResponse?<button onClick={switchToLogin} className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}>
                <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                Login/Signup
            </button>
            :""}
            {/* {showLogin && <Login switchToSignUp={switchToSignUp} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}/>} 
            {showSignUp && <SignUp switchToLogin={switchToLogin} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}/>} */}
            {(accessToken && userDataResponse)?
                <button className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    >
                    <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                    {userDataResponse.name && userDataResponse.name.slice(0,1).toUpperCase()+userDataResponse.name.slice(1)}
                    {isHovered && <ProfileToolkit handleLogout={handleLogout} switchToLogin={switchToLogin} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} userId={userDataResponse._id} />}
                </button>:""}
                {/* <button onClick={handleLogout} className={`${styles.login_button} flex items-center justify-between p-15 w-auto relative`}>
                    <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                    Log out
                </button> */}
        </div>
    )
}
const CustomLink=({to,children,...props})=>{
    //This hook resolves the given path (to) into an absolute path. 
    const resolvedPath=useResolvedPath(to);

    //This hook is used to check if the current route matches the provided path.
    const isActive=useMatch({path:resolvedPath.pathname,end:true})

    // const path=window.location.pathname;
    return (
        <li className={isActive?`${styles.active}`:''}>
            <Link to={to} {...props}> 
                {children}
            </Link>
        </li>
    )
}
export default Navbar;