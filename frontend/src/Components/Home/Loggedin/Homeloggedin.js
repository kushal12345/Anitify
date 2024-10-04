import React, { useState,useEffect } from 'react'
/*import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import { useRef } from 'react';*/
import Bodylayout from '../../../Layout/bodylayout';
import Headerlayout from '../../../Layout/Headerlayout';
import Loggedrightpart from '../../Rightpart/Loggedin/Loggedrightpart';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';

const Homeloggedin = () => {
  const {sidebarOpen} = useContext(AuthContext);


//    const snackbar = useRef(null);
  return (
         <div className=' grid grid-rows-[3fr, 3fr] h-screen  overflow-hidden  text-white'>
            <div  className={`absolute -z-[2] top-0 left-0 w-full h-screen  bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500`}></div>
            {/* <SnackbarAlert ref={snackbar}/>*/} 
            <div className={`z-10 ${(sidebarOpen===true)? ' lg:visible text-white md:visible xl:visible sm:invisible xs:invisible' : ' lg:visible text-white md:visible xl:visible sm:visible xs:visible'}}`}>
              <Headerlayout/>
            </div>

            <div className='z-0  h-auto'>
                <Bodylayout>
                    <Loggedrightpart/>
                </Bodylayout>  
            </div>
          </div>
    
  )
}

export default Homeloggedin