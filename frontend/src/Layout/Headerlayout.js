import React from 'react'
import { Link } from 'react-router-dom'
import { TbBrandSpotify } from "react-icons/tb";


const Headerlayout = () => {
  return (
        <div className='grid grid-cols-8 h-3/6 items-center justify-center text-center gap-2'>
            <div className='  flex items-center justify-center'>
                <Link className='flex items-center justify-center '>
                    <TbBrandSpotify  style={{ width: 32, height: 32 }}/>
                    <span className='font-bold tracking-wide'>SPOTIFY</span>
                </Link>
            </div>

            <div className='col-span-2'>
                <form class="max-w-md mx-auto">   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-1 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-2 ps-6 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your favourite Music" required />
                        <button type="submit" class="text-white absolute end-1 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>

            <div className='col-start-7 col-span-1'>
                
            </div>

            <div className=' flex items-center col-start-8 col-span-1 '>
                <Link>
                    Login
                </Link>
                <Link className=' rounded-2xl mx-2 px-2 py-1 bg-accent-blue'>
                    Register
                </Link>
            </div>
        </div>
  )
}

export default Headerlayout