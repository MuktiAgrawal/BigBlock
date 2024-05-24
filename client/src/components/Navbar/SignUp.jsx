import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import host from "../../host.js"

const SignUp = ({ switchToLogin, onClose, setAccessToken, setRefreshToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        
        // Check if the form is valid
        if (event.target.checkValidity()) {
            try {
                const response = await sendUserData();
                if (response.data.message === "User already exists") {
                    switchToLogin();
                } else if (response.data.message === "User Registered Successfully") {
                    onClose();
                }
                if (response.data.message === "User Registered Successfully") {
                    setAccessToken(response.data.accessToken);
                    setRefreshToken(response.data.refreshToken);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast("Please enter a valid email address.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const sendUserData = async () => {
        try {
            const response = await axios.post(`${host.apiUrl}/user/signUp`, { name, email, password });
            toast(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="text-white fixed w-full h-full bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 backdrop-blur-[1px]">
            <form 
                className="absolute min-w-[40%] min-h-[75%] flex flex-col justify-around top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[var(--color14)] p-10"
                onSubmit={handleSignUp}
            >
                <span className="absolute top-5 right-5 scale-150 text-2xl cursor-pointer" onClick={onClose}>
                    &times;
                </span>
                <h2 className='text-3xl mt-0 mb-3'>Sign Up</h2>
                <div className='mb-3'>
                    <label className='block'>Name:</label>
                    <input
                        className='w-full text-black placeholder:text-[var(--color7)] bg-[var(--color1)] hover:border-[var(--color6)] hover:border-2 rounded-md p-3'
                        placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='block'>Email:</label>
                    <input
                        className='w-full text-black placeholder:text-[var(--color7)] bg-[var(--color1)] hover:border-[var(--color6)] hover:border-2 rounded-md p-3'
                        placeholder='mail@website.com' type="email" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                </div>
                <div className='mb-3'>
                    <label className='block'>Password:</label>
                    <input
                        className='w-full text-black placeholder:text-[var(--color7)] bg-[var(--color1)] hover:border-[var(--color6)] hover:border-2 rounded-md text-[11px] p-3'
                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8}
                    />
                </div>
                <div className='inline'>
                    <button type="submit" className='bg-[var(--color1)] text-[var(--color4)] p-[10px] rounded-[20px] w-auto px-7 hover:bg-[var(--color2)]'>Sign Up</button>
                    <p className='inline px-3'>Already have an account? 
                        <a onClick={switchToLogin} className='cursor-pointer hover:text-[var(--color6)] hover:underline px-3'>Log in </a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
