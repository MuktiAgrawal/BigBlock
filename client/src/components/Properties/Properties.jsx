import React, { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { LiaBedSolid } from "react-icons/lia";
import { LiaBathSolid } from "react-icons/lia";
import furnished from "../../assets/cabinet.png"
import area from "../../assets/area.png"
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Properties =() => {
  const navigate=useNavigate();
  const [pageNumber,setPageNumber] = useState(1);
  const propertiesPerPage = 5;
  const pagesPerSlot=2; 
  const [totalPages, setTotalPages]=useState(1);
  const [pageSlot,setPageSlot]=useState(1);
  const [properties,setProperties]=useState([]);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getPageProperties=async ()=>{
    try{
      const res=await axios.get(`http://localhost:5000/property?page=${pageNumber}&perPage=${propertiesPerPage}`);
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
  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = (pageSlot - 1) * pagesPerSlot + 1; i <= pageSlot * pagesPerSlot; i++) {
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
    console.log("next button pressed");
    setPageNumber((pageSlot)*pagesPerSlot+1);
    setPageSlot(pageSlot+1);
    renderPageButtons();
  }
  const moveToPrevPage=()=>{
    setPageNumber((pageSlot-2)*pagesPerSlot+1)
    setPageSlot(pageSlot-1);
    renderPageButtons();
  }
  useEffect(()=>{
    console.log("getpage properties called");
    getPageProperties();
  },[pageNumber]);

  return (
    <div className='h-full w-full flex'>
      {/*left part */}
      <div className='h-full fixed w-64 bg-red-500'>ajdkl</div>
      {/* right part */}
      <div className='ml-64 mr-14 flex-1'>
        <h2 className="text-center font-bold">Properties</h2>
        {/* all cards */}
        <div className='grid grid-cols-3 m-4 gap-6 mt-0 w-full h-auto'>
          {/* each card */}
          {properties?.map(property => (
          <div key={property._id} onClick={()=>openProperty(property._id)} className='h-[400px]'>
            {/* <div className=' m-3'>
              <Slider {...settings}>
                {property.imageUrls.map((image,index)=>(
                  <img key={index} className='h-[230px] w-full object-fill rounded-lg overflow-hidden' src={image}/>
                ))}
              </Slider>
            </div> */}
            <div className='m-3'><img className='h-[230px] w-full object-fill rounded-lg overflow-hidden' src={property.imageUrls[0]}/></div>
            <div className='flex justify-between p-3'>
              <h4 className='m-0'>{property.address}</h4>
              <h4 className='m-0'>$ {property.buy_price?property.buy_price:property.rent_price+"/month"}</h4>
            </div>
            <div className='flex p-3 pl-0'>
              <div className='flex flex-col flex-1 items-center justify-start '>
                <div className=' text-[var(--color5)] w-fit bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <LiaBedSolid className='text-[24px]'/>
                </div>
                <div className='text-center'>{property.bedrooms} Beds</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className=' text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <LiaBathSolid className='text-[24px]'/>
                </div>
                <div className='text-center'>{property.bathrooms} Baths</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className='text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <img src={furnished} className='w-[24px] h-[24px]'/>
                </div>
                <div className='text-center'>{property.furnished ? "" : "Not "}Furnished</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className='text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <img src={area} className='w-[24px] h-[24px]'/>
                </div>
                <div className='text-center'>{property.area} sqft</div>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='flex items-center justify-center mt-12 mb-6'>
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
  )
}

export default Properties
