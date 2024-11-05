import React from 'react'
import Header from './Content/Header'
import Mainbody from './Content/Mainbody'

const Rightmain = ({setsecondPage, setshow}) => {
  return (
    <div className='h-full'>
      <div className='w-full  shadow-xl'>
        <Header />
      </div>
      
      <div className='h-auto'>
        <Mainbody setsecondPage={setsecondPage}  setshow={setshow}/>  
      </div>


      
    </div>
  )
}

export default Rightmain