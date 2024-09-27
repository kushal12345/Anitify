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
    <div className='bg-white bg-opacity-15 backdrop-blur-md mb-2 py-1   grid grid-flow-col grid-cols-5 md:grid-rows-1 lg:grid-rows-1 xl:grid-rows-1  xs:grid-rows-2 sm:grid-rows-2  gap-2'>
        <div className='    col-span-1 row-span-1 xs:row-span-1 sm:row-span-1 flex items-center justify-center'>
                <Link className='flex items-center justify-center '>
                    <TbBrandSpotify  style={{ width: 32, height: 32 }}/>
                </Link>

                <Link className='flex  bg-white bg-opacity-25 p-1 hover:bg-opacity-35 rounded-full mx-2 items-center justify-center '>
                    <BiSolidHome  style={{ width: 26, height: 26 }}/>
                </Link> 
        </div>

        <div className='flex items-end col-span-1 xs:col-span-4 sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1   row-span-1 xs:row-span-2 sm:row-span-2'>
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

        <div className='col-span-1   row-span-1 xs:row-span-1 sm:row-span-1 md:row-span-2 lg:row-span-2 xl:row-span-2'>
             
        </div>

        <div className='col-span-1   row-span-1 xs:row-span-1 sm:row-span-1'>
              
        </div>

        <div className='col-span-1  row-span-1 xs:row-span-2 sm:row-span-2 flex items-start justify-center'>
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