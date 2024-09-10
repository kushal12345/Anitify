import React, { useState, useEffect, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useImperativeHandle } from 'react';

//severity type success,info,warning,error

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

  useImperativeHandle(ref, () => ({
    setAlert
  }));

  return (
    <div>
      <Stack>
        <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}   >
          <Alert variant="filled" severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
});

export default SnackbarAlert    