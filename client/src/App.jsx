import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import Properties from "./components/Properties/Properties"
import Contact from "./components/Contact/Contact";
import {Route,Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Navbar/Login";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProperty from "./components/Navbar/AddProperty";

const App=()=>{
    return (
        <div className="relative min-h-[100vh] w-full overflow-x-hidden">
            <Navbar/>
            <div className="pt-[10vh] absolute md:w-screen w-auto bg-[color:var(--color1)] z-0 h-[100vh]">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/properties" element={<Properties/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/add-property" element={<AddProperty/>}/>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

                />
            <ToastContainer />
        </div>
    )
}
export default App;