import React, { useState,useEffect } from 'react'
/*import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import { useRef } from 'react';*/
import Bodylayout from '../../../Layout/bodylayout';
import Headerlayout from '../../../Layout/Headerlayout';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';
import Adminloggedin from '../admin/Adminloggedin';
import Loggedrightdash from './Loggedrightpartdash.js/Loggedrightdash';

const Homeloggedin = () => {
  const {sidebarOpen,cookies} = useContext(AuthContext);


//    const snackbar = useRef(null);
  return (
         <div className=' grid grid-rows-[3fr, 3fr] h-screen  overflow-hidden  text-white'>
            <div  className={`absolute -z-[2] top-0 left-0 w-full h-screen bluetopurple`}></div>
            {/* <SnackbarAlert ref={snackbar}/>*/} 
            <div className={`z-10 ${(sidebarOpen===true)? ' lg:visible text-white md:visible xl:visible sm:invisible xs:invisible' : ' lg:visible text-white md:visible xl:visible sm:visible xs:visible'}}`}>
              <Headerlayout/>
            </div>

            <div className='z-0  h-auto'>
                <Bodylayout>
                    {
                      (cookies.Authority==='artist')?<Adminloggedin/>:<Loggedrightdash/>
                    }

                </Bodylayout>  
            </div>
          </div>
    
  )
}

export default Homeloggedin