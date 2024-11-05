import React from 'react'
import Rightmain from '../Rightpart/Rightmain.js';
import Footer from '../Footer/Footer.js';
const Container = ({setsecondPage, setshow}) => {
  return (
    <div className=' h-screen z-10 overflow-y-auto  rounded-xl bg-white bg-opacity-10 backdrop-blur-md  '>
        <div className=' h-auto   '> 
            <Rightmain setsecondPage={setsecondPage}  setshow={setshow}/>
        </div>
       
        <div className=' h-auto  '>
            <Footer/>
        </div>
    </div>
  
  )
}

export default Container