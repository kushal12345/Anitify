import React, { useState, useEffect, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useImperativeHandle } from 'react';


const SnackbarAlert = forwardRef((props, ref) => {
  const [msg, setmsg] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setseverity] = useState('');
  

  useEffect(() => {
    if (msg) {
      setMessage(msg);
      setOpen(true);
      const timerId = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => {
        clearTimeout(timerId);
      }; 
    } else {
      setOpen(false);
    }
  }, [msg]);

  const setAlert = (mesg, severity) => {
    setmsg(mesg);
    setseverity(severity);
  }

  useImperativeHandle(ref, () => ({     //you cannot call function inside component as static function you need to declare imperative handle and pass ref to props
    setAlert
  }));

  return (
    <div>
    
        <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}   >
        <Stack>
          <Alert variant="filled" severity={severity}>
            {message}
          </Alert>
          </Stack>  
        </Snackbar>
     
    </div>
  )
});

export default SnackbarAlert    