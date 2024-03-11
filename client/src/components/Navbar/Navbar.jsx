import styles from "./styles.module.css"
import logo from "../../assets/big-block-high-resolution-logo-transparent1.png"
import {Link, useResolvedPath, useMatch, useLocation} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Navbar=()=>{
    const [showLogin,setShowLogin]=useState(false);
    const [showSignUp,setShowSignUp]=useState(false);
    const [accessToken, setToken] = useState(() => localStorage.getItem('jwtAccessToken') || "");
    const [refreshToken, setRefToken] = useState(() => localStorage.getItem('jwtRefreshToken') || "");
    let userDataResponse;
    useEffect(() => {
        localStorage.setItem('jwtAccessToken', accessToken);
    }, [accessToken]);

    useEffect(() => {
        localStorage.setItem('jwtRefreshToken', refreshToken);
    }, [refreshToken]);

    const setAccessToken = (token) => {
        setToken(token);
    }

    const setRefreshToken = (token) => {
        setRefToken(token);
    }
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
    const handleLogout=async ()=>{
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('jwtRefreshToken');
        localStorage.removeItem('jwtAccessToken');
        const res=await axios.delete("http://localhost:5000/user/logout");
        console.log(res.message);
    }
    const fetchUserData=async ()=>{
        try{
            if(accessToken){
                const currentTime = Date.now() / 1000; // Current time in seconds
                const decodedToken = jwtDecode(String(accessToken)); // Decoding the JWT token
                // console.log("Decoded Token using jwt_decode",decodedToken);
                // console.log(currentTime);
                if (decodedToken.exp > currentTime) {
                    console.log("Token not expired", accessToken);
                    userDataResponse = await axios.get("http://localhost:5000/user/user-data", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log("User data response", userDataResponse?.data);
                }
            
                // if expired token, generate new access token using refresh token
                else{
                    const newToken = await axios.post("http://localhost:5000/user/token",
                        { refreshToken }
                    );
                    setAccessToken(newToken.data.accessToken); 
                    console.log("Access token generated from refresh token",newToken.data.accessToken);
                    userDataResponse=await axios.get("http://localhost:5000/user/user-data",{
                        headers: {
                            Authorization: `Bearer ${newToken.data.accessToken}`
                        }
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchUserData();
    },[accessToken,refreshToken]);

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
            {!accessToken?<button onClick={switchToLogin} className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}>
                <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                Login/Signup
            </button>
            :""}
            {showLogin && <Login switchToSignUp={switchToSignUp} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}/>} 
            {showSignUp && <SignUp switchToLogin={switchToLogin} onClose={handleCloseModal}/>}
            {accessToken?<button onClick={handleLogout} className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}>
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