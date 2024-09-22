import React,{useState,useEffect} from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import { useContext } from 'react'
import AuthContext from '../Components/Hooks/Auth/AuthContext'


const Bodylayout = ({children}) => {
  
  const {sidebarOpen, setSidebarOpen }= useContext(AuthContext);
  
  return ( 
    <div className='grid grid-cols-10  h-auto gap-2'>
        <div className={` w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl h-screen overflow-hidden flex flex-col transform ${sidebarOpen ? 'xs:col-span-10 sm:col-span-10 md:col-span-2 lg:col-span-2 xl:col-span-2' : 'xs:invisible sm:invisible md:col-span-2 lg:col-span-2 xl:col-span-2'} transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 `}>
            <Sidebar setSidebarOpen={setSidebarOpen}/>
        </div>
        <div className={` w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-visible ${!sidebarOpen ? ' xs:invisible sm:invisible md:col-span-8  lg:col-span-8  xl:col-span-8 ' : ' xs:col-span-10 sm:col-span-10 md:col-span-8  lg:col-span-8  xl:col-span-8'} `}>
            {children}
        </div>
    </div>
  )
}

export default Bodylayout