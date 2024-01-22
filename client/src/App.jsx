import "./App.css"
import Navbar from "./components/Navbar/Navbar";
import Properties from "./components/Properties/Properties"
import Contact from "./components/Contact/Contact";
import {Route,Routes} from "react-router-dom";
import Home from "./components/Home/Home";


const App=()=>{
    return (
        <div className="App">
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/properties" element={<Properties/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default App;