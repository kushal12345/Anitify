import React from 'react'
import Rightmain from '../Rightpart/Rightmain.js';

const Container = ({children}) => {
  return (
    <div className='min-h-screen z-10 overflow-hidden rounded-xl bg-white bg-opacity-10 backdrop-blur-md '>
        <div className=' min-h-[80vh]  '>
            <Rightmain/>
        </div>
       
        <div className=' min-h-[20vh] '>
            {children}
        </div>
    </div>
  
  )
}

export default Container