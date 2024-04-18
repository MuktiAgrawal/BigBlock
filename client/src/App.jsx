import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import Properties from "./components/Properties/Properties"
import Contact from "./components/Contact/Contact";
import {Route,Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProperty from "./components/Navbar/AddProperty";
import IndividualProperty from "./components/Properties/IndividualProperty";
import MyProperties from "./components/Navbar/MyProperties";
import UpdateProperty from "./components/Navbar/UpdateProperty";
const App=()=>{
    return (
        <div className="relative min-h-[100vh] w-full overflow-x-hidden">
            <Navbar/>
            <div className="pt-[10vh] absolute md:w-screen w-auto bg-[color:var(--color1)] z-0 h-[auto]">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/properties" element={<Properties/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/property/add-property/:userId" element={<AddProperty/>}/>
                    <Route path="/property/each/:propertyId" element={<IndividualProperty/>}/>
                    <Route path="/property/my-property/:userId" element={<MyProperties/>}/>
                    <Route path="/property/my-property/updateProperty/:propertyId" element={<UpdateProperty/>}/>
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