import React from 'react';
import { CgProfile } from "react-icons/cg";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import house2 from "../../assets/house7_background.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const AddYourProperty = () => {
    const navigate=useNavigate();
    // const [accessToken, setToken] = useState(() => localStorage.getItem('jwtAccessToken') || "");
    // const [refreshToken, setRefToken] = useState(() => localStorage.getItem('jwtRefreshToken') || "");
    // const [userDataResponse,setData]=useState(null);
    const {switchToLogin,userDataResponse}=useAuth();

    const backgroundStyle = {
        backgroundImage: `url(${house2})`,
    };

    // const setAccessToken = (token) => {
    //     setToken(token);
    // }
    
    // const setRefreshToken = (token) => {
    //     setRefToken(token);
    // }
    // const fetchUserData=async()=>{
    //     if(accessToken && refreshToken){
    //         try{
    //             const response = await axios.get("http://localhost:5000/user/user-data", {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                     'Refresh-token':refreshToken
    //                 }
    //             });
    //             if(response.data.message!="Invalid token or user not logged in"){
    //                 if(response.data.accessToken)
    //                     setAccessToken(response.data.accessToken);
    //                 // console.log(response.data.accessToken);
    //                 setData(response.data.user);
    //                 // console.log("User data response", response?.data.user);
    //             }
    //         }
    //         catch(err){
    //             console.log(err)
    //         }
    //     }
    // }
    // useEffect(()=>{
    //     fetchUserData();
    // },[accessToken,refreshToken]);

    const handleSubmit=()=>{
        if(userDataResponse){
            navigate(`/property/add-property/${userDataResponse._id}`)
        }
        else{
            toast("Please login first.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // open login modal
            switchToLogin();
        }
    }
    return (
        <div className='m-12 p-16 text-white flex flex-col min-h-[80vh] justify-between bg-cover' id="add-your-property" style={backgroundStyle}>
            <p className='text-xl pb-2'>Welcome</p>
            <p className='text-2xl pb-3'>Add Your Property To Our List</p>
            <p>We have a big customer base to market your property to right buyers. So get started by following these simple steps.</p>
            <div className='flex flex-row justify-between pb-4 pt-4'>
                <div className='flex flex-col pr-6'>
                    <CgProfile className='text-[var(--color3)] text-4xl'/>
                    <p className='text-[var(--color3)] pt-2 pb-4'>Register</p>
                    <p>Join our community and unlock the potential to sell your property to eager buyers.</p>
                </div>
                <div className='flex flex-col pr-6'>
                    <TfiWrite className='text-[var(--color3)] text-4xl'/>
                    <p className='text-[var(--color3)] pt-2 pb-4'>Fill Up Property Details</p>
                    <p>Provide comprehensive details about your property to attract the right audience effortlessly.</p>
                </div>
                <div className='flex flex-col pr-6'>
                    <IoCheckmarkDoneCircleOutline className='text-[var(--color3)]  text-4xl'/>
                    <p className='text-[var(--color3)] pt-2 pb-4'>You Are Done</p>
                    <p>Congratulations! Your property is now listed and ready to captivate potential buyers.</p>
                </div>
            </div>
            <div className='justify-center items-center flex'>
                <button onClick={handleSubmit} className=' bg-[var(--color3)] text-[var(--color1)] border-none rounded-3xl p-[10px] cursor-pointer '>Submit your property</button>
            </div>
        </div>
    );
};

export default AddYourProperty;
