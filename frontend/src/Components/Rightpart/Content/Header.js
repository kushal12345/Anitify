import React, { useEffect } from 'react'
import { LuChevronRightCircle } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'
import { IoMenu } from "react-icons/io5";
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';


const Header = () => {

    const {setSidebarOpen} = useContext(AuthContext);



  return (
    <div className=' h-[8vh] text-white  w-full bg-white bg-opacity-10 backdrop-blur-md grid grid-cols-8'>
        <div className='col-start-1 col-end-2 flex justify-start items-center '>
                <Button variant="ghost" size="icon" className="lg:invisible text-white md:invisible xl:invisible sm:visible xs:visible" onClick={() => setSidebarOpen(true)}>
                    <IoMenu size={24} />
                </Button>
            
        </div>

        <div className='col-start-7 px-4 col-end-9 flex items-center justify-end'>
                <Link to="/login" className='font-semibold hover:text-blue-500'>
                    Login
                </Link>
                <Link to="/register" className='hover:text-blue-500 hover:bg-[#ffffff] rounded-2xl mx-2 px-2 py-2 bg-accent-blue hover:shadow-md font-semibold'>
                    Register
                </Link>

        </div>
        
    </div>
  )
}

export default Header