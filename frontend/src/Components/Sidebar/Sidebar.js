import React from 'react'
import { Link } from 'react-router-dom';
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { TbBrandSpotify } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className='h-auto'>
      <div className='p-2 mb-2 justify-items-center rounded-xl tertiary_bg h-[19vh]'>

          <div className="flex mb-2 items-center gap-0 "> 
              <TbBrandSpotify  style={{ width: 32, height: 32 }}/>
              <span className='font-bold tracking-wide'>SPOTIFY</span>
              
          </div>

          <div className="flex items-center gap-4 hover:font-bold hover:cursor-default">
            <BiSolidHome className="font-bold text-xl" />
            <span>Home</span>
          </div>
          
          <div className="flex mt-4 items-center gap-4 hover:font-bold hover:cursor-default">
            <FiSearch className="font-bold text-xl" />
            <span>Search</span>
          </div>
      </div>

      <div className='p-2 rounded-xl tertiary_bg h-auto text-white min-h-[calc(100vh-18vh)] '>
                <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                    <div className="flex gap-2 items-center">
                        <BiLibrary className="font-bold text-[1.3rem]" />
                        <span>Your library</span>
                    </div>
                    <button className="hover:bg-black/25 rounded-[50%] p-2">
                        <FaPlus className="font-bold text-xl" />
                    </button>
                </div>
                <div className="your_library">
                    <div className="leading-8 mt-2 secondary_bg rounded-xl py-3 px-4">
                        <p className="font-bold">Create your first playlist</p>
                        <p className="font-semibold">
                            It's easy, we'll help you
                        </p>
                        <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                            Create playlist
                        </button>
                    </div>
                    <div className="leading-8 mt-4 secondary_bg rounded-xl py-3 px-4">
                        <p className="font-bold">
                            Let's find some podcasts to follow
                        </p>
                        <p className="font-semibold">
                            We'll keep you updated on new episodes
                        </p>
                        <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                            Browse Podcast
                        </button>
                    </div>
                </div>
      </div>
    </div>
  )
}

export default Sidebar