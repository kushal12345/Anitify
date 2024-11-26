import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TbBrandSpotify } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { FaUser   } from "react-icons/fa";
import { Button } from '@mui/material'; 
import { IoMenu } from "react-icons/io5";
import AuthContext from '../Components/Hooks/Auth/AuthContext';
import Popover from '../Components/Popover/Popover';

const HeaderLayout = () => {
  const [opened, setOpened] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { sidebarOpen, setSidebarOpen, logout } = useContext(AuthContext);
  const { cookies } = useContext(AuthContext);

  const dropdownOpen = () => {
    setOpened(!opened);
  }

  const handleClick = () => {
    setPopoverOpen(true);
  }

  return (
    <div className='bg-white bg-opacity-15 backdrop-blur-md mb-2 py-1 grid grid-flow-col md:grid-cols-5 gap-2'>
      {/* Grid 1 */}
      <div className='col-span-1 flex items-center justify-start'>
        <Button variant="ghost" size="icon" className={`${(sidebarOpen) ? 'hidden' : 'visible'}`} onClick={() => setSidebarOpen(true)}>
          <IoMenu size={24} />
        </Button>
        <Link className='flex items-center justify-center'>
          <TbBrandSpotify style={{ width: 32, height: 32 }} />
        </Link>
      </div>

      {/* Grid 2 */}
      <div className='flex items-center justify-start col-span-3'>
        <form className="max-w-md flex-grow">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-2 flex items-center ps-1 pointer-events-none">
              <svg className="w-4 h-4 text-opacity-100 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full pl-8 pr-0 py-2 rounded-full placeholder-opacity-100 placeholder-white text-md text-opacity-100 bg-white bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="Search..." required />
          </div>
        </form>
      </div>

      <div className='mx-2 col-span-2 flex items-center justify-center'>
        {cookies.Authority === "artist" && (
        <button 
        className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded 
               sm:py-1 sm:px-1 sm:text-sm xs:py-1 xs:px-1 xs:text-xs md:py-2 md:px-2 md:text-md lg:py-2 lg:px-2 lg:text-md xl:py-2 xl:px-2 xl:text-md "
        onClick={handleClick}>
        Upload Track
        </button>
        )}

        {popoverOpen && <Popover onClose={() => setPopoverOpen(false)} />}

        <div className='mx-2'>
          <IoIosNotifications style={{ width: 32, height: 32 }} />
        </div>

        <div className='bg-white bg-opacity-25 p-1 hover:bg-opacity-35 rounded-full items-center mx-2' onClick={dropdownOpen}>
          <FaUser  className='p-0.5 m-1' style={{ width : 24, height: 24, borderRadius: 100 }} />
        </div>

        <div className={`absolute p-2 flex justify-end right-5 top-12 w-1/6 h-38 ${opened ? '' : 'hidden'}`}>
          <div className='glass w-3/6'>
            <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:cursor-pointer hover:text-opacity-100 text-opacity-100 w-full h-[4vh] my-2'>
              <Link to="/Profile">Profile</Link>
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