import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TbBrandSpotify } from "react-icons/tb";
import { BiSolidHome } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";



const Headerlayout = () => {
    const [opened,setOpened] = useState(false);

        const dropwdownopen = () => {
            setOpened(!opened);
        }
   
    
  return (
        <div className='grid bg-white bg-opacity-15 backdrop-blur-md grid-cols-8 mb-2 py-1 items-center justify-center text-center gap-2'>
            <div className=' flex items-center justify-center'>
                <Link className='flex mx-2 items-center justify-center '>
                    <TbBrandSpotify  style={{ width: 32, height: 32 }}/>
                </Link>

                <Link className='flex  bg-white bg-opacity-25 p-1 hover:bg-opacity-35 rounded-full mx-2 items-center justify-center '>
                    <BiSolidHome  style={{ width: 26, height: 26 }}/>
                </Link>
                             
            </div>

            <div className='col-span-2'>
                <form className=" max-w-md mx-auto">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium  sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-2 flex items-center ps-1 pointer-events-none">
                            <svg className="w-4 h-4 text-opacity-100 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input 
                            type="search" 
                            id="default-search" 
                            className="block w-full p-2 ps-6 pl-10 pr-4 py-2 rounded-full placeholder-opacity-100 placeholder-white text-opacity-100 bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 " 
                            placeholder="Search..." 
                            required
                        />
                    </div>
                </form>
            </div>

            <div className='col-start-7 col-span-1'>
                
            </div>

            <div className=' flex items-center justify-end mx-2 col-start-8 col-span-1 '>
                <div className='mx-2'>
                    <IoIosNotifications  style={{ width: 32, height: 32 }}/>
                </div>

                <div className='bg-white bg-opacity-25 p-1 hover:bg-opacity-35 rounded-full items-center mx-2' onClick={dropwdownopen}>
                    <FaUser className='   p-0.5 m-1'  style={{ width: 24, height: 24,  Radius:100 }}/>
                </div>
                <div className={`absolute p-2  flex justify-end right-5 top-12  w-1/6 h-38 ${opened ? '' : 'hidden' }`}>
                    <div className='bg-white bg-opacity-20 w-3/6 '>
                        <div className=' flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2'>
                                Profile
                        </div>

                        <div className=' flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2'>
                                Setting
                        </div>

                        <div className=' flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2'>
                                Logout
                        </div>
                    </div>
                       
                </div>
                
            </div>
        </div>
  )
}

export default Headerlayout