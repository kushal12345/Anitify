import React from 'react'
import { Link } from 'react-router-dom'


const Headerlayout = () => {
  return (
    <div className='border-white bg-black text-center h-5/6'>
        <div className='grid grid-cols-8 h-5/6 items-center gap-2'>
            <div className=' border-white '>
                <Link>
                    Logo
                </Link>
            </div>

            <div className='border-white col-span-2'>
                <input placeholder='   Search Your Music' className='rounded-md' />
            </div>

            <div className='border-white col-start-7 col-span-1'>
                <Link>
                    Login
                </Link>
            </div>

            <div className='border-white col-start-8 col-span-1 '>
                <Link>
                    Register
                </Link>
            </div>

        </div>
    </div>
  )
}

export default Headerlayout