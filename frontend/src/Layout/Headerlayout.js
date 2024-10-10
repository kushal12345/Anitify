import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TbBrandSpotify } from "react-icons/tb";
import { BiSolidHome } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { FaUser  } from "react-icons/fa";
import { Button } from '@mui/material';
import { IoMenu } from "react-icons/io5";
import AuthContext from '../Components/Hooks/Auth/AuthContext';

const HeaderLayout = () => {
  const [opened, setOpened] = useState(false);
  const { sidebarOpen, setSidebarOpen,logout } = useContext(AuthContext);

  const dropdownOpen = () => {
    setOpened(!opened);
  }

  return (
    <div className='bg-white bg-opacity-15 backdrop-blur-md mb-2 py-1 grid grid-flow-col grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 xs:grid-cols-5 sm:grid-cols-5 gap-2'>
      <div className='  col-span-1 row-span-1 xs:col-span-1 sm:col-span-1 flex items-center justify-start'>
        <Button variant="ghost" size="icon" className={`${(sidebarOpen === true) ? 'lg:invisible text-white md:invisible xl:invisible sm:invisible xs:invisible' : 'lg:invisible text-white md:invisible xl:invisible sm:visible xs:visible'}`} onClick={() => setSidebarOpen(true)}>
          <IoMenu size={24} />
        </Button>
        <Link className='flex items-center justify-center'>
          <TbBrandSpotify style={{ width: 32, height: 32 }} />
        </Link>

        <Link className='flex bg-white bg-opacity-25 p-1 hover:bg-opacity-35 rounded-full mx-2 items-center justify-center'>
          <BiSolidHome style={{ width: 26, height: 26 }} />
        </Link>
      </div>

      <div className=' flex items-center justify-start col-span-3 xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 row-span-1 xs:row-span-1 sm:row-span-1'>
        <form className="max-w-md sm:mx-auto xs:mx-auto md:mx-0 lg:mx-0 xl:mx-0">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only dark:text-white">Search</label>
          <div className=" relative">
            <div className="absolute inset-y-0 start-2 flex items-center ps-1 pointer-events-none">
              <svg className="w-4 h-4 text-opacity-100 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-2  pl-10 pr-4 py-2 rounded-full placeholder-opacity-100 placeholder-white text-opacity-100 bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Search..." required />
          </div>
        </form>
      </div>

    

      <div className=' col-span-1 row-span-1 xs:col-span-1 sm:col-span-1 flex items-center justify-center'>
      
        
        <div className='mx-2'>
          <IoIosNotifications style={{ width: 32, height: 32 }} />
        </div>

        <div className='bg-white bg-opacity-25 p-1 hover:bg-opacity-35 rounded-full items-center mx-2' onClick={dropdownOpen}>
          <FaUser  className='p-0.5 m-1' style={{ width: 24, height: 24, borderRadius: 100 }} />
        </div>

        <div className={` absolute p-2 flex justify-end right-5 top-12 w-1/6 h-38 ${opened ? '' : 'hidden'}`}>
          <div className='bg-white bg-opacity-20 w-3/6'>
            <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2'>
              Profile
            </div>

            <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2'>
              Setting
            </div>

            <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2' onClick={logout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderLayout;