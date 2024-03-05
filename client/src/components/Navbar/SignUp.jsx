import React from 'react'
import { useState } from 'react';
import axios from "axios";

const SignUp = ({switchToLogin,onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const handleSignUp = () => {
        const success=sendUserData();
        // console.log(success);
    };

    const sendUserData=async ()=>{
        try{
            const response=await axios.post("http://localhost:5000/user/signUp",{name,email,password});
            alert(response.data.message);
            if(response.data.message=="User already exists"){
                switchToLogin();
            }
            else if(response.data.successful==true){
                onClose();
            }
            return response.data.successful;
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="text-white fixed w-full h-full bg-[rgba(0,0,0,0.5) top-0 left-0 right-0 bottom-0] backdrop-blur-[1px]">
            <div className="absolute min-w-[40%] min-h-[75%] flex flex-col justify-around top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[var(--color3)] p-10">
                <span className="absolute top-5 right-5 scale-150 text-2xl cursor-pointer" onClick={onClose}>
                    &times;
                </span>
                <h2 className='text-3xl'>Sign Up</h2>
                <div>
                    <label className='block'>Name:</label>
                    <input className='w-full text-black placeholder:text-[var(--color7)] bg-[var(--color1)] hover:border-[var(--color6)] hover:border-2 rounded-md p-3 '
                    placeholder='mail@website.com' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className='block'>Email:</label>
                    <input className='w-full text-black placeholder:text-[var(--color7)] bg-[var(--color1)] hover:border-[var(--color6)] hover:border-2 rounded-md p-3 '
                    placeholder='mail@website.com' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className='block'>Password:</label>
                    <input className='w-full text-black placeholder:text-[var(--color7)] bg-[var(--color1)] hover:border-[var(--color6)] hover:border-2 rounded-md text-[11px] p-3 ' 
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='inline'>
                    <a className='bg-[var(--color1)] text-[var(--color4)] p-[10px] rounded-[20px] w-auto px-7 hover:bg-[var(--color2)]' onClick={handleSignUp}>Sign Up</a>
                    <p className='inline px-3'>Already have an account? 
                        <a onClick={switchToLogin} className='cursor-pointer hover:text-[var(--color6)] hover:underline px-3'>Log in </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
