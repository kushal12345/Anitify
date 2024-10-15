import React,{useState,useEffect} from 'react'
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPinAngleFill } from "react-icons/bs";
import { useContext } from 'react';
import AuthContext from '../../../Hooks/Auth/AuthContext';

const Usersidebar = () => {
    const {cookies} = useContext(AuthContext);

    const Scroll = (e) => {
        const strength = Math.abs(e.deltaY);
    if (e.deltaY === 0) return;

    const el = e.currentTarget;
    if (
      !(el.scrollLeft === 0 && e.deltaY < 0) &&
      !(
        el.scrollWidth -
          el.clientWidth -
          Math.round(el.scrollLeft) ===
          0 && e.deltaY > 0
      )
    ) {
      e.preventDefault();
    }
    el.scrollTo({
      left: el.scrollLeft + e.deltaY,
      // large scrolls with smooth animation behavior will lag, so switch to auto
      behavior: strength > 70 ? "auto" : "smooth",
    });
    }

  return (
    <div className='h-full'>
         {/* Tag part  */}
         <div className='w-full  px-2 h-[8%] '>
            <div onWheel={Scroll} className='flex items-center h-full w-full items-center gap-3 overflow-x-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] '  >
            
                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px] ' >
                        Playlist
                    </div>

                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex  rounded-xl justify-center px-2 py-1 h-auto  min-w-[100px]'>
                        Artists
                    </div>

                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 h-auto min-w-[100px]'>
                        Albums
                    </div>

                    <div className=' bg-white bg-opacity-20 hover:bg-opacity-35 hover:cursor-pointer flex rounded-xl justify-center px-2 py-1 min-w-[100px] '>
                        Podcasts
                    </div>
            </div>
        </div>

         {/* Playlist part  */}
        <div className='bg-white bg-opacity-20 my-3 w-full h-3/5 overflow-y-scroll rounded-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              {/* Search part  */}
            <div className="flex mt-2 px-2 justify-between mb-4 items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <FaSearch className="font-bold text-[1.4rem]" />
                            
                        </div>
                        <div className=" flex mx-2 px-1 py-1 ">
                            <span>Recent</span>
                            <GiHamburgerMenu className=" mx-2 font-bold text-[1.0rem]" />
                        </div>
            </div> 
            
            {/* Playlist part  */}
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
                                    <div className='flex items-center text-sm w-full h-1/2'>
                                        <BsPinAngleFill color='green' className=''/>
                                        <span className=''>.</span>Playlist
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

export default Usersidebar