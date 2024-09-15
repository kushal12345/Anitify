import React from 'react'
/*import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import { useRef } from 'react';*/
import Bodylayout from '../../../Layout/bodylayout';
import Headerlayout from '../../../Layout/Headerlayout';
import Loggedrightpart from '../../Rightpart/Loggedin/Loggedrightpart';


const Homeloggedin = () => {

//    const snackbar = useRef(null);
  return (
         <div className=' grid grid-rows-[3fr, 3fr] text-white'>
            <div className='absolute -z-[2] top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500'></div>
            {/* <SnackbarAlert ref={snackbar}/>*/} 
            <div className=' '>
              <Headerlayout/>
            </div>

            <div className='-z-[1] '>
                <Bodylayout>
                    <Loggedrightpart/>
                </Bodylayout>  
            </div>
          </div>
    
  )
}

export default Homeloggedin