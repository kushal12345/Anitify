import React from 'react'
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbBrandSpotify } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className='h-auto sidebar'>
      <div className='p-2 pr-8  pb-4  mb-2 justify-items-center rounded-xl  '>

          <div className="flex py-1 mb-2 items-center primary_text gap-0 "> 
              <TbBrandSpotify  style={{ width: 32, height: 32 }}/>
              <span className='font-bold tracking-wide  m-2'>Aurora</span>
              
          </div>

          <div className="flex rounded-xl px-2 py-1 items-center  gap-4 hover:bg-gray-800 ">
            <BiSolidHome className="font-bold text-xl" />
            <span className=' font-smooth hover:font-smooth hover:cursor-default '>Home</span>
          </div>
          
          <div className="flex rounded-xl px-2 py-1 hover:bg-gray-800 mt-4 items-center gap-4 ">
            <FiSearch className="font-bold text-xl" />
            <span>Search</span>
          </div>
      </div>

      <div className='p-2 rounded-xl tertiary_bg h-auto text-white min-h-[calc(100vh-18vh)] h-dvh '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                    <div className="flex gap-2 items-center">
                        <BiLibrary className="font-bold text-[1.4rem]" />
                        <span>Your library</span>
                    </div>
                    <button className="rounded-2xl mx-2 px-1 py-1 bg-accent-blue hover:shadow-md hover:bg-black/25 rounded-[50%] p-2">
                        <FaPlus className="font-bold text-xl" />
                    </button>
                </div>
                <div className="your_library">
                    <div className="leading-6 mt-2 secondary_bg rounded-xl py-3 px-4">
                        <p className="font-bold">Create your first playlist</p>
                        <p className="">
                            It's easy, we'll help you
                        </p>
                        <button className=" rounded-2xl mx-2 px-2 py-2 bg-accent-blue hover:shadow-md rounded-full  mt-4 px-4 py-0  font-semibold">
                            Create playlist
                        </button>
                    </div>
                    <div className="leading-6 mt-4 secondary_bg rounded-xl py-3 px-4">
                        <p className="font-bold">
                            Let's find some podcasts to follow
                        </p>
                        <p className="">
                            We'll keep you updated on new episodes
                        </p>
                        <button className="rounded-2xl mx-2 px-2 py-2 bg-accent-blue hover:shadow-md rounded-full  mt-4 px-4 py-0  font-semibold">
                            Browse Podcast
                        </button>
                    </div>
                </div>
      </div>
    </div>
  )
}

export default Sidebar