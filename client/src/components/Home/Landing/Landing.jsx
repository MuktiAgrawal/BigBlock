import house9 from "../../../assets/landing_image.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const [sellChecked, setSellChecked] = useState(false);
    const [rentChecked, setRentChecked] = useState(false);
    const [formData, setFormData] = useState({
        searchTerm: "",
        type: ""
    });
    const navigate=useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "buy") {
            const newSellChecked = !sellChecked;
            setSellChecked(newSellChecked);
            updateType(newSellChecked, rentChecked);
        } else if (name === "rent") {
            const newRentChecked = !rentChecked;
            setRentChecked(newRentChecked);
            updateType(sellChecked, newRentChecked);
        } else if (name === "searchTerm") {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const updateType = (sell, rent) => {
        let newType;
        if (sell && rent) {
            newType = "all";
        } else if (sell) {
            newType = "sell";
        } else if (rent) {
            newType = "rent";
        } else {
            newType = "";
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            type: newType
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/property?type=${formData.type}&searchTerm=${formData.searchTerm}`)
        console.log(formData);
    };

    return (
        <div className='flex relative min-h-[80vh] items-center mt-[6vh]'>
            <div className='border border-[var(--color4)] min-w-[20vw] p-[10px] flex flex-col w-[28vw] h-[67vh] z-10 left-[14%] absolute backdrop-blur-[5px]'>
                <h1 className="p-[6px] pt-0 pb-0 text-[var(--color5)]">FIND YOUR DREAM HOUSE</h1>
                <p className='text-[var(--color6)] text-[14px] p-2 pt-0'>
                    How often have you driven down a street and seen a home that was exactly what you always wanted? It's true, we all have an image of our perfect dream home, and we can help you find it!
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input
                        type="text"
                        name="searchTerm"
                        value={formData.searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className='flex-1 rounded-3xl shadow-md m-2 p-2 pl-3 border-none outline-none placeholder-[var(--color5)]'
                    />
                    <div className='flex justify-around items-center m-3'>
                        <label>Type:</label>
                        <div>
                            <input name="buy" value="sell" checked={sellChecked} onChange={handleInputChange} type="checkbox" />
                            <span> Buy </span>
                        </div>
                        <div>
                            <input name="rent" value="rent" checked={rentChecked} onChange={handleInputChange} type="checkbox" />
                            <span> Rent </span>
                        </div>
                    </div>
                    <div className='flex justify-center items-center translate-y-[8px]'>
                        <button type="submit" className='flex-[0.3] bg-[var(--color3)] hover:bg-[var(--color4)] active:bg-[var(--color4)] text-[var(--color1)] border-none rounded-3xl p-[10px] cursor-pointer'>
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className='absolute left-[28%] w-[60vw] h-[80vh]'>
                <img className='w-full h-full object-cover' src={house9} alt="img" />
            </div>
        </div>
    );
};

export default Landing;
