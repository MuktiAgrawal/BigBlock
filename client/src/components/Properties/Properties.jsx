import React, { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { LiaBedSolid } from "react-icons/lia";
import { LiaBathSolid } from "react-icons/lia";
import axios from 'axios';
import { FaChair } from "react-icons/fa6";
import { SlSizeFullscreen } from "react-icons/sl";

const Properties =() => {
  const navigate=useNavigate();
  const [pageNumber,setPageNumber] = useState(1);
  const propertiesPerPage = 9;
  const pagesPerSlot=3; 
  const [totalPages, setTotalPages]=useState(1);
  const [pageSlot,setPageSlot]=useState(1);
  const [properties,setProperties]=useState([]);

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

  useEffect(()=>{
    getPageProperties();
  },[pageNumber]);

  return (
    <div className='h-full w-full flex'>
      {/*left part */}
      <div className='h-full fixed w-64 bg-slate-500'>
        ajdkl
      </div>
      {/* right part */}
      <div className='ml-64 mr-6 flex-1 p-8 pt-0'>
        <h2 className="text-center font-bold">Properties</h2>
        {/* all cards */}
        <div className='grid grid-cols-3 gap-4 mt-0 w-full h-auto bg-white p-4 shadow-md'>
          {/* each card */}
          {properties?.map(property => (
          <div key={property._id} onClick={()=>openProperty(property._id)} className='h-[400px] rounded-lg shadow-sm border border-[var(--color8)] pb-4'>
            <div className='m-3'><img className='h-[230px] w-full object-fill rounded-lg overflow-hidden' src={property.imageUrls[0]}/></div>
            <div className='flex justify-between p-3'>
              <h4 className='m-0'>{property.address}</h4>
              {property.buy_price?
              <p className='m-0 pr-3 font-semibold text-lg'>Rs {property.buy_price}</p>
              :<p className='m-0 pr-3 font-semibold text-lg'>Rs {property.rent_price}
              <span className='text-[var(--color11)] text-sm'>/month</span>
              </p>
              }
            </div>
            <div className='flex p-3 pl-0'>
              <div className='flex flex-col flex-1 items-center justify-start '>
                <div className=' text-[var(--color5)] w-fit bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <LiaBedSolid className='text-[21px]'/>
                </div>
                <div className='text-center text-sm'>{property.bedrooms} Beds</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className=' text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <LiaBathSolid className='text-[21px]'/>
                </div>
                <div className='text-center text-sm'>{property.bathrooms} Baths</div>
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className='text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <FaChair className='text-[21px]'/>
                </div>
                {property.furnished ?
                <div className='text-center text-sm'>Furnished</div>
                :<div className='text-center text-[13px]'>Unfurnished</div>
                }
              </div>
              <div className='flex-1 items-center flex flex-col justify-start'>
                <div className='text-[var(--color5)] bg-[var(--color10)] border-2 p-[6px] border-[var(--color5)] rounded-full overflow-hidden'>
                  <SlSizeFullscreen className='text-[21px]'/>
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
  )
}

export default Properties
