import React from 'react'
import { TbBrandSpotify } from "react-icons/tb";
import { BiSolidHome } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
const Logohomesearch = () => {
  return (
    <div className='p-2 pr-8  pb-4  mb-2 justify-items-center rounded-xl  '>

          <div className="flex py-1 mb-2 items-center text-white gap-0 "> 
              <TbBrandSpotify  style={{ width: 32, height: 32 }}/>
              <span className='font-bold tracking-wide  m-2'>Aurora</span>
              
          </div>

          <div className="flex rounded-xl px-2 py-1 items-center text-white gap-4 hover:text-blue-800 ">
            <BiSolidHome className="font-bold text-xl" />
            <span className=' font-smooth hover:font-smooth hover:cursor-default '>Home</span>
          </div>
          
          <div className="flex rounded-xl px-2 py-1 text-white hover:text-blue-800 mt-4 items-center gap-4 ">
            <FiSearch className="font-bold text-xl" />
            <span>Search</span>
          </div>
      </div>
  )
}

export default Logohomesearch