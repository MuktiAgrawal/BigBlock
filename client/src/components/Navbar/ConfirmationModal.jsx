import React from 'react'
import { IoWarning } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

const ConfirmationModal = ({propertyId,closeConfirmationModal:closeModal,fetchData}) => {
    const handleDelete=async()=>{
        try{
            const res=await axios.delete(`http://localhost:5000/property/my-property/deleteProperty/${propertyId}`)
            if(res.status==200){
                closeModal();
                fetchData();
                toast(res.data.message, {
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
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='fixed w-full h-full  bg-[rgba(0,0,0,0.5)] top-0 left-0 right-0 bottom-0 backdrop-blur-[1px]'>
            <div className='absolute min-w-[30%] min-h-[50%] justify-around top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[var(--color10)] flex flex-col p-10 items-center rounded-lg' >
                <div className=''><IoWarning className='text-red-600 text-6xl'/></div>
                <h3 className='text-[var(--color6)] '>Are you Sure?</h3>
                <p className='text-[var(--color6)]'>This action will delete the property permanently</p>
                <div className='flex w-full justify-around pt-4'>
                    <button  onClick={closeModal} className='p-1 rounded-md border border-red-600 text-red-600'>Cancel</button>
                    <button onClick={handleDelete} className='p-1 rounded-md  bg-red-600 text-white'>Yes, delete it</button>
                </div>
                <button onClick={closeModal} className='absolute top-2 right-3 scale-150 text-2xl cursor-pointer'>&times;</button>
            </div>
        </div>
    )
}

export default ConfirmationModal
