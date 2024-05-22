import React, { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { LiaBedSolid } from "react-icons/lia";
import { LiaBathSolid } from "react-icons/lia";
import axios from 'axios';
import { FaChair } from "react-icons/fa6";
import { SlSizeFullscreen } from "react-icons/sl";
import Footer from "../Home/Footer"

const Properties =() => {
  const navigate=useNavigate();
  const [pageNumber,setPageNumber] = useState(1);
  const propertiesPerPage = 9;
  const pagesPerSlot=3; 
  const [totalPages, setTotalPages]=useState(1);
  const [pageSlot,setPageSlot]=useState(1);
  const [properties,setProperties]=useState([]);
  const [sellChecked, setSellChecked] = useState(true);
  const [rentChecked, setRentChecked] = useState(true);
  const [sideBarData,setSideBarData]=useState({
    searchTerm:"",
    type:"all",
    parking:false,
    garden:false,
    theatre:false,
    tennis:false,
    furnished:false,
    sort:'createdAt',
    order:"desc"
  })

  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const searchTermFromUrl=urlParams.get("searchTerm")
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const theatreFromUrl = urlParams.get('theatre');
    const gardenFromUrl=urlParams.get("garden")
    const tennisFromUrl=urlParams.get("tennis")
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || gardenFromUrl || tennisFromUrl || theatreFromUrl || sortFromUrl || orderFromUrl){
      setSideBarData({
        searchTerm:searchTermFromUrl || "",
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        theatre: theatreFromUrl === 'true' ? true : false,
        garden: gardenFromUrl === 'true' ? true : false,
        tennis: tennisFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      })
    }
    const getPageProperties=async ()=>{
      try{
        const searchQuery=urlParams.toString();
        // console.log(searchQuery);
        const res=await axios.get(`http://localhost:5000/property?page=${pageNumber}&perPage=${propertiesPerPage}&${searchQuery}`);
        if(res.status==200){
          setProperties(res?.data?.properties);
          setTotalPages(Math.ceil(res.data.count / propertiesPerPage));
        }
      }
      catch(err){
        console.log("Error in retrieving page properties");
        console.log(err);
      }
    }
    getPageProperties();
  },[window.location.search,pageNumber])

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = (pageSlot - 1) * pagesPerSlot + 1; i<=totalPages && i <= pageSlot * pagesPerSlot; i++) {
      const isActive = i === pageNumber;
      const buttonClass = isActive
        ? "bg-[var(--color3)] text-white "
        : "bg-white hover:bg-[var(--color3)] hover:text-[var(--color1)] ";
      pageButtons.push(
        <button
          key={i}
          className={`rounded-full border border-[var(--color8)] p-3 h-12 w-12 ml-3 mr-3 ${buttonClass}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    if (name === "buy") {
      const newSellChecked = !sellChecked;
      setSellChecked(newSellChecked);
      updateType(newSellChecked, rentChecked);
    } else if (name === "rent") {
        const newRentChecked = !rentChecked;
        setRentChecked(newRentChecked);
        updateType(sellChecked, newRentChecked);
    } else if (name === "searchTerm") {
        setSideBarData({
            ...sideBarData,
            [name]: value
        });
    }
    else if(name==="parking" || name==="garden" || name==="tennis" || name==="theatre" || name==="furnished"){
      // console.log(name,e.target.checked)
      setSideBarData({
        ...sideBarData,
        [name]:e.target.checked
      })
    }
    else if(name==="sort_order"){
      const sort=value.split("_")[0] || "createdAt"
      const order=value.split("_")[1] || "desc"
      
        setSideBarData({
          ...sideBarData,
          sort,
          order
        })
      
    }
    console.log(sideBarData)
  }

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
    setSideBarData((prev) => ({
        ...prev,
        type: newType
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('type', sideBarData.type);
    urlParams.set('parking', sideBarData.parking);
    urlParams.set('furnished', sideBarData.furnished);
    urlParams.set('garden', sideBarData.garden);
    urlParams.set('theatre', sideBarData.theatre);
    urlParams.set('tennis', sideBarData.tennis);
    urlParams.set('sort', sideBarData.sort);
    urlParams.set('order', sideBarData.order);
    const searchQuery = urlParams.toString();
    if(sideBarData.type=="all"){
      setRentChecked(true);
      setSellChecked(true);
    }
    console.log(sideBarData)
    console.log(searchQuery);
    navigate(`/property?${searchQuery}`);
  }

  const renderNextButton=()=>{
    if(totalPages>pagesPerSlot && pageSlot<Math.ceil(totalPages/pagesPerSlot)){
      return <button className="text-[var(--color4)] font-bold ml-6" onClick={moveToNextPage}>NEXT</button>
    }
  }

  const renderPrevButton=()=>{
    if(pageSlot>1){
      return <button className="text-[var(--color4)] font-bold mr-6" onClick={moveToPrevPage}>PREV</button>
    }
  }

  const moveToNextPage=()=>{
    setPageNumber((pageSlot)*pagesPerSlot+1);
    setPageSlot(pageSlot+1);
    renderPageButtons();
  }

  const moveToPrevPage=()=>{
    setPageNumber((pageSlot-2)*pagesPerSlot+1)
    setPageSlot(pageSlot-1);
    renderPageButtons();
  }

  const openProperty = (propertyId) => {
    if (propertyId) {
      navigate(`/property/each/${propertyId}`);
    } else {
      navigate('/property');
    }
  };

  const handlePageClick=(page)=>{
    setPageNumber(page);
  }

  const resetSideBarData = () => {
    const defaultSideBarData = {
      searchTerm: "",
      type: "all",
      parking: false,
      garden: false,
      theatre: false,
      tennis: false,
      furnished: false,
      sort: 'createdAt',
      order: 'desc'
    };
  
    setSideBarData(defaultSideBarData);
    setSellChecked(true);
    setRentChecked(true);
    setPageNumber(1);
    setPageSlot(1);
    
    navigate('/property');
  };
  
  return (
    <div>
    <div className='h-full w-full flex'>
      {/*left part */}
      <form onSubmit={handleSubmit} className='relative h-full w-64 bg-[var(--color10)] border-r border-[var(--color12)] p-6 pt-10=== text-[var(--color13)] text-sm'>
        <button onClick={resetSideBarData} className='absolute top-0 right-0 p-2 pt-5 text-[var(--color4)] font-bold text-[13px]'>CLEAR ALL</button>
        <div className='flex flex-col mt-4'>
          <label className="text-[16px]" htmlFor="searchTerm">Search term:</label>
          <input type="text" name="searchTerm" value={sideBarData.searchTerm} onChange={handleInputChange} className='text-[14px] p-2 mt-2 rounded-lg border border-[var(--color2)]' placeholder='Search..'/>
        </div>
        <div className='mt-4'>
          <label className="text-[16px]" htmlFor="type">Type:</label>
          <div className='flex justify-evenly mt-2'>
            <div className='flex flex-1 justify-evenly items-center'>
              <input name="buy" checked={sideBarData.type=="sell" || sideBarData.type=="all"} onChange={handleInputChange} type="checkbox" className='scale-125'/>
              <label htmlFor="sell" onChange={handleInputChange} >Sell</label>
            </div>
            <div className='flex-1 flex justify-evenly items-center'>
              <input name="rent" checked={sideBarData.type=="rent" || sideBarData.type=="all"} onChange={handleInputChange}  type="checkbox" className='scale-125'/>
              <label htmlFor="rent">Rent</label>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <label className="text-[16px]" htmlFor="amenities">Amenities:</label>
          <div className='flex mt-2 flex-wrap'>
            <div className='flex-1 flex justify-evenly items-center p-2'>
              <input name="parking" checked={sideBarData.parking} type="checkbox" onChange={handleInputChange} className='scale-125'/>
              <label htmlFor="parking">Parking</label>
            </div>
            <div className='flex-1 flex justify-evenly items-center p-2'>
              <input name="garden" checked={sideBarData.garden} type="checkbox" onChange={handleInputChange} className='scale-125'/>
              <label htmlFor="garden">Garden</label>
            </div>
            <div className='flex-1 flex justify-evenly items-center p-2'>
              <input name="theatre" checked={sideBarData.theatre} type="checkbox" onChange={handleInputChange} className='scale-125'/>
              <label htmlFor="theatre">Theatre</label>
            </div>
            <div className='flex-1 flex justify-evenly items-center p-2'>
              <input name="tennis" checked={sideBarData.tennis} type="checkbox" onChange={handleInputChange} className='scale-125'/>
              <label htmlFor="tennis">Tennis</label>
            </div>
            <div className='flex-1 flex justify-evenly items-center p-2'>
              <input name="furnished" type="checkbox" checked={sideBarData.furnished} onChange={handleInputChange} className='scale-125'/>
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
        </div>
        <div className='mt-4 flex flex-col'>
          <label className="text-[16px]" htmlFor="sort_order">Sort:</label>
          <select value={`${sideBarData.sort}_${sideBarData.order}`} name="sort_order" onChange={handleInputChange} className='p-2 mt-2 rounded-lg border border-[var(--color2)]'>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc" >Oldest</option>
            <option value="price_desc">Price high to low</option>
            <option value="price_asc">Price low to high</option>
          </select>
        </div>
        <div className='flex justify-center mt-4'>
          <button type="submit" className='block w-full bg-[var(--color3)] hover:bg-[var(--color4)] active:bg-[var(--color4)] text-[var(--color1)] border-0 rounded-3xl m-2 p-[8px] cursor-pointer'>Search</button>
        </div>
      </form>
      {/* right part */}
      <div className='mr-6 flex-1 p-8 pt-0'>
        <h2 className="text-center font-bold">Properties</h2>
        {/* all cards */}
        <div className='grid grid-cols-3 gap-4 mt-0 w-full h-auto bg-white p-4 shadow-md'>
          {/* each card */}
          {properties?.map(property => (
          <div key={property._id} onClick={()=>openProperty(property._id)} className='h-[400px] rounded-lg shadow-sm border border-[var(--color8)] pb-4'>
            <div className='m-3'><img className='h-[230px] w-full object-fill rounded-lg overflow-hidden' src={property.imageUrls[0]}/></div>
            <div className='flex justify-between p-3 text-[16px]'>
              <p className='font-semibold m-0'>{property.name}</p>
              {property.buy_price?
              <p className='m-0 pr-3 font-semibold'>Rs {property.buy_price}</p>
              :<p className='m-0 pr-3 font-semibold'>Rs {property.rent_price}
              <span className='text-[var(--color11)] text-sm'>/month</span>
              </p>
              }
            </div>
            <div className='flex p-3 pl-0'>
              <div className='flex flex-col flex-1 items-center justify-start '>
                <div className=' text-[var(--color5)] w-fit bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <LiaBedSolid className='text-[20px]'/>
                </div>
                <div className='text-center text-sm'>{property.bedrooms} Beds</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className=' text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <LiaBathSolid className='text-[20px]'/>
                </div>
                <div className='text-center text-sm'>{property.bathrooms} Baths</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className='text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <FaChair className='text-[20px]'/>
                </div>
                {property.furnished ?
                <div className='text-center text-sm'>Furnished</div>
                :<div className='text-center text-[13px]'>Unfurnished</div>
                }
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className='text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <SlSizeFullscreen className='text-[20px]'/>
                </div>
                <div className='text-center text-sm'>{property.area} sqft</div>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='flex items-center justify-center border-t bg-white p-2 shadow-md'>
          {/* pageSlot*propertiesperPage+1 to (pageSlot+1)*propertiesPerPage */}
          {/* a loop */}
          {renderPrevButton()}
          <div className=''>
            {renderPageButtons()}
          </div>
          {renderNextButton()}
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Properties
