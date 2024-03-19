import styles from "./styles.module.css"
import logo from "../../assets/big-block-high-resolution-logo-transparent1.png"
import {Link, useResolvedPath, useMatch, useLocation} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProfileToolkit from "./ProfileToolkit";

const Navbar=()=>{
    const [showLogin,setShowLogin]=useState(false);
    const [showSignUp,setShowSignUp]=useState(false);
    const [accessToken, setToken] = useState(() => localStorage.getItem('jwtAccessToken') || "");
    const [refreshToken, setRefToken] = useState(() => localStorage.getItem('jwtRefreshToken') || "");
    const [userDataResponse,setData]=useState(null);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        console.log("Fetching user data on application start...");
        if (accessToken) {
            fetchUserData(); 
            console.log(userDataResponse)
        }
    },[]);
    // console.log(userDataResponse);
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
        try{
            const res=await axios.delete(`http://localhost:5000/user/logout/${refreshToken}`);
            setAccessToken("");
            setRefreshToken("");
            localStorage.removeItem('jwtRefreshToken');
            localStorage.removeItem('jwtAccessToken');
            setData(null);
        }
        catch(err){
            console.log(err);
        }
    }
    const fetchUserData=async ()=>{
        try{
            // console.log("Access token in fetch user"+accessToken)
            if(accessToken){
                const currentTime = Date.now() / 1000; // Current time in seconds
                const decodedToken = jwtDecode(String(accessToken)); // Decoding the JWT token
                // console.log("Decoded Token using jwt_decode",decodedToken);
                console.log(currentTime);

                if (decodedToken.exp > currentTime) {
                    // console.log("Token not expired", accessToken);
                    const response = await axios.get("http://localhost:5000/user/user-data", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log(response.data)
                    setData(response.data);
                    console.log("User data response", response?.data);
                }
                // if expired token, generate new access token using refresh token
                else{
                    const newToken = await axios.post("http://localhost:5000/user/token",
                        { refreshToken }
                    );
                    setAccessToken(newToken.data.accessToken); 
                    console.log("Access token generated from refresh token",newToken.data.accessToken);
                    const response = await axios.get("http://localhost:5000/user/user-data", {
                        headers: {
                            Authorization: `Bearer ${newToken.data.accessToken}`
                        }
                    });
                    setData(response.data);
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
                <CustomLink to="/properties">Properties</CustomLink>
                <CustomLink to="/contact">Contact</CustomLink>
            </ul>
            {!accessToken?<button onClick={switchToLogin} className={`${styles.login_button} flex items-center justify-between p-15 w-auto`}>
                <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                Login/Signup
            </button>
            :""}
            {showLogin && <Login switchToSignUp={switchToSignUp} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}/>} 
            {showSignUp && <SignUp switchToLogin={switchToLogin} onClose={handleCloseModal} setAccessToken={setAccessToken} setRefreshToken={setRefreshToken}/>}
            {(accessToken && userDataResponse)?
                <button className={`${styles.login_button} flex items-center justify-between p-15 w-auto relative`}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    >
                    <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                    {userDataResponse.name}
                    {isHovered && <ProfileToolkit handleLogout={handleLogout} switchToLogin={switchToLogin} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} userId={userDataResponse._id} />}
                </button>:""}
                <button onClick={handleLogout} className={`${styles.login_button} flex items-center justify-between p-15 w-auto relative`}>
                    <CgProfile className='px-2 transform scale-[130%] w-auto'/>
                    Log out
                </button>
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