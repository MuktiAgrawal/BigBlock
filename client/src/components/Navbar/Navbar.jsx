import styles from "./styles.module.css"
import logo from "../../assets/big-block-high-resolution-logo-transparent1.png"
import {Link, useResolvedPath, useMatch, useLocation} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
// const currPath=useLocation();
const Navbar=()=>{
    const [showLogin,setShowLogin]=useState(false);
    const [showSignUp,setShowSignUp]=useState(false);
    const [token,setToken]=useState(() => localStorage.getItem('jwtToken') || "");

    // setToken(localStorage.getItem('jwtToken'));
    const handleCloseModal=()=>{
        setShowLogin(false);
        setShowSignUp(false);
    }

    const switchToLogin=()=>{
        setShowLogin(true);
        setShowSignUp(false);
    }
    const switchToSignUp=()=>{
        setShowLogin(false);
        setShowSignUp(true);
    }
    // console.log("Token",token);
    const handleLogout=async ()=>{
        localStorage.removeItem('jwtToken');
        setToken("");
        const res=await axios.delete("http://localhost:5000/user/logout");
        console.log(res.message);
    }
    return (
        <div className={styles.Navbar}>
            <Link to="/">
                <img className={styles.logo} src={logo} alt="img"/>
            </Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/properties">Properties</CustomLink>
                <CustomLink to="/contact">Contact</CustomLink>
            </ul>
            {!token?<button onClick={switchToLogin} className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}>
                <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                Login/Signup
            </button>
            :""}
            <h1>{token}</h1>
            {showLogin && <Login switchToSignUp={switchToSignUp} onClose={handleCloseModal}/>} 
            {showSignUp && <SignUp switchToLogin={switchToLogin} onClose={handleCloseModal}/>}
            {token?<button onClick={handleLogout} className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}>
                <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                Logout
            </button>:""}
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