import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Bodylayout = ({children}) => {
  return ( 
    <div className='flex min-h-screen gap-2'>
        <div className='bg-white bg-opacity-10 backdrop-blur-md rounded-xl w-1/5'>
            <Sidebar/>
        </div>
        <div className=' w-4/5'>
            {children}
        </div>
    </div>
  )
}

export default Bodylayout