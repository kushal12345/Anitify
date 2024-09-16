import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Bodylayout = ({children}) => {
  return ( 
    <div className='grid grid-cols-10  h-auto gap-2'>
        <div className='col-span-2 w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden '>
            <Sidebar/>
        </div>
        <div className='col-span-8 w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-visible  '>
            {children}
        </div>
    </div>
  )
}

export default Bodylayout