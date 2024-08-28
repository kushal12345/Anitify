import React from 'react'
import Header from './Content/Header'
import Mainbody from './Content/Mainbody'

const Rightmain = () => {
  return (
    <div>
      <div className='w-full  shadow-xl'>
        <Header />
      </div>
      
      <div className=''>
        <Mainbody/>  
      </div>


      
    </div>
  )
}

export default Rightmain