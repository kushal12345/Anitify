import React from 'react'
import { BsPinAngleFill } from "react-icons/bs";
import { useContext } from 'react';
import AuthContext from '../../../Hooks/Auth/AuthContext';
import { BiLibrary } from "react-icons/bi";
import { IoAlbumsOutline } from "react-icons/io5";

const ArtistSidebar = () => {

    const {cookies} = useContext(AuthContext)
  return (
    <div className='h-full w-full '>
        <nav>
          <ul>
            <li className="mb-4"><i className="fas fa-home mr-2"></i> Home</li>
            <li className="mb-4"><i className="fas fa-search mr-2"></i> Search</li>
            <li className="mb-4"><i className="fas fa-book mr-2"></i> Your Library</li>
            <li className="mb-4"><i className="fas fa-chart-line mr-2"></i> Analytics</li>
            <li className="mb-4"><i className="fas fa-upload mr-2"></i> Upload</li>
          </ul>
        </nav>
        <div className=' h-2/5 mb-5 w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <IoAlbumsOutline className="font-bold text-[1.4rem]" />
                            <span className='font-bold text-lg'>Your Albums</span>
                        </div>
                        
                    </div>
        {
            Array(8).fill(0).map((_, index) => {
                return (
                <div key={index} className='flex text-[1rem]  w-full h-auto hover:bg-white hover:bg-opacity-35'>
                    {/* Image part  */}
                    <div className='w-1/4 aspect-square p-2'>
                    <img src="https://picsum.photos/400/400" className='w-full h-full object-cover' />
                    </div> 
                    {/* Playlist Details */}
                    <div className='w-2/3 py-3'>
                    <div className='w-full font-bold flex items-center h-1/2'>
                        English
                    </div>
                    <div className='flex items-center w-full h-1/2'>
                        <BsPinAngleFill color='green' className='text-[1.2rem]'/>
                        <span className='text-[1.6rem]'>.</span>2004
                        <span className='text-[1.6rem]'>.</span>{cookies.User.name}
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