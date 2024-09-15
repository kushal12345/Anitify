import React from 'react'
/*import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import { useRef } from 'react';*/
import Bodylayout from '../../../Layout/bodylayout';
import Headerlayout from '../../../Layout/Headerlayout';
import Loggedrightpart from '../../Rightpart/Loggedin/Loggedrightpart';


const Homeloggedin = () => {

//    const snackbar = useRef(null);
  return (
    <div className='min-h-screen text-white bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 text-gray-900'>
       {/* <SnackbarAlert ref={snackbar}/>*/} 
        <Headerlayout/>
        <Bodylayout>
          <Loggedrightpart/>
        </Bodylayout>  
    </div>
  )
}

export default Homeloggedin