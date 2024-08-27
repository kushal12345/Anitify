import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Bodylayout = ({children}) => {
  return (
    <div className='flex gap-1'>
        <div className='border border-solid w-1/4'>
            <Sidebar/>
        </div>
        <div className='border border-solid w-3/4'>
            {children}
        </div>
    </div>
  )
}

export default Bodylayout