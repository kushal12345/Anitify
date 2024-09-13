import React from 'react'
import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import { useRef } from 'react';

const Homeloggedin = () => {

    const snackbar = useRef(null);
  return (
    <div>
        <SnackbarAlert ref={snackbar}/>
        Homeloggedin
    </div>
  )
}

export default Homeloggedin