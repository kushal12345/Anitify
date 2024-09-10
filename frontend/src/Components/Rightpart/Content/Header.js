import React from 'react'
import { LuChevronRightCircle } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className=' h-[8vh] w-full secondary_bg grid grid-cols-8'>
        <div className='col-start-1 col-end-2 flex justify-start items-center '>
            <div className=' w-2/4 flex justify-end'>
                <LuChevronRightCircle className='m-1 flex rotate-180 text-[2.5vw] hover:text-[2.8vw] hover:text-primary '/>
            </div>

            <div className=' w-2/4'>
                <LuChevronRightCircle className=' m-1  flex text-[2.5vw] hover:text-[2.8vw] hover:text-primary '/>
            </div>
        </div>

        <div className='col-start-7 px-4 col-end-9 flex items-center justify-end'>
                <Link to="/login" className='font-semibold'>
                    Login
                </Link>
                <Link to="/register" className=' rounded-2xl mx-2 px-2 py-2 bg-accent-blue hover:shadow-md font-semibold'>
                    Register
                </Link>

        </div>
        
    </div>
  )
}

export default Header