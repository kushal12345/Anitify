import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Bodylayout = ({children}) => {
  return ( 
    <div className='flex min-h-screen gap-2'>
        <div className='tertiary_bg rounded-xl w-1/5'>
            <Sidebar/>
        </div>
        <div className=' w-4/5'>
            {children}
        </div>
    </div>
  )
}

export default Bodylayout