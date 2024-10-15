import React from 'react'
import { BsPinAngleFill } from "react-icons/bs";
import { useContext } from 'react';
import AuthContext from '../../../Hooks/Auth/AuthContext';
import { FaHome, FaSearch, FaBook, FaChartLine, FaUpload } from 'react-icons/fa';
import { IoAlbumsOutline } from "react-icons/io5";

const ArtistSidebar = () => {

    const {cookies} = useContext(AuthContext)
  return (
    <div className='h-full w-full '>
        <div className='w-full'>
          <div className='w-full pl-4'>
                <div className="mb-3 flex  w-full ">
                    <FaHome className="mr-2" /> 
                    <span className="text-sm ">Home</span>
                </div>
                <div className="mb-3  flex w-full">
                    <FaSearch className="mr-2" /> 
                    <span className="text-sm ">Search</span>
                </div>
                <div className="mb-3 flex  w-full">
                    <FaBook className="mr-2" />
                    <span className="text-sm ">Your Library</span>
                </div>
                <div className="mb-3 flex w-full">
                    <FaChartLine className="mr-2" />
                    <span className="text-sm ">Analytics</span>
                </div>
                <div className="mb-3 flex w-full">
                    <FaUpload className="mr-2" />
                    <span className="text-sm ">Upload</span>
                </div>
            </div>
        </div>
        <div className=' h-2/5 mb-5 w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <IoAlbumsOutline className="font-bold text-[1.4rem]" />
                            <span className='font-bold text-lg'>Your Albums</span>
                        </div>
                        <div>
                            <span className='text-sm'>more</span>
                        </div>
                    </div>
        {
            Array(8).fill(0).map((_, index) => {
                return (
                <div key={index} className='flex text-sm  w-full h-auto overflow-hidden hover:bg-white hover:bg-opacity-35'>
                    {/* Image part  */}
                    <div className='w-1/4 aspect-square p-2'>
                    <img src="https://picsum.photos/400/400" className='w-full h-full object-cover' />
                    </div> 
                    {/* Playlist Details */}
                    <div className='w-2/3 py-3'>
                    <div className='w-full font-bold flex items-center h-1/2'>
                        English
                    </div>
                    <div className='flex items-center text-sm w-full h-1/2'>
                        <BsPinAngleFill color='green' className=''/>
                        <span className=''>.</span>2004
                        <span className=''>.</span>{cookies.User.name}
                    </div>
                    </div> 
                </div>  
                )
            })
        }
        </div>
    </div>
  )
}

export default ArtistSidebar