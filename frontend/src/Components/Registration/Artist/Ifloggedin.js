import { Button } from '@mui/material'
import { useRef } from 'react';
import React from 'react'
import { useState } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import api from '../../../Services/api';
import { Link } from 'react-router-dom';


const Ifloggedin = () => {
  const API_ADDRESS = `https://anitify-api.vercel.app`;
  const [isEnabled, setIsEnabled] = useState(false);
  const {cookies} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsEnabled(!isEnabled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(cookies.User){
      try {
        api.post(`/api/artistregister/${cookies.User._id}`)
        .then(res=>{
          console.log(res.data)
          snackbar.current.setAlert("Sucessfully Registered", "success");
          const timerId = setTimeout(() => {
          navigate("/home");
          }, 3000);
          return () => {
            clearTimeout(timerId);
          };  
        })
        .catch(error => {
          console.log(error.response.data.message);
          snackbar.current.setAlert(`${error.response.data.message}`, "error");
        })
        .finally(() => {
          setLoading(false); // set loading to false when the request is complete
        });
      } catch (error) {
          console.log(`${API_ADDRESS} not found`);
          console.log(`Error part ${error.json}`);
          snackbar.current.setAlert(`${API_ADDRESS} not found`, "error");
          setLoading(false);
      }
    }
  }
  const snackbar = useRef(null);

  return (
    <div>
          <SnackbarAlert ref={snackbar} />
          {
            loading?
            <Loading/>
            :
            <>
               <div className=' w-screen h-screen grid grid-rows-10 bluetopurple '>
              <div className='w-full row-span-1 flex items-center justify-start xs:justify:center sm:justify:center md:justify:start lg:justify:start xl:justify:start'>
                <span className='px-3 text-8xl'>
                  For <b>Artist</b> 
                </span>
              </div>
              {/* first div to rendered */}
              <div className={`w-full row-span-9 flex flex-col items-center justify-center ${isEnabled ? 'hidden' : 'none'} `}>
                <span className='my-2 text-8xl text-bold protest-strike-regular' >Claim and Artist Profile</span> <br/>
                <span>If you already have music on Aurora, you can get access to stats, </span>
                <span className='my-2'>pitch tracks to our editors, and more.</span>
                <div className=''>
                <Button className='my-2 mx-2 rounded-full ' variant="contained" onClick={handleClick}>Continue</Button>
                <span className='mx-3'>OR</span>
                <Link className='my-2 mx-2' to="/Artistlogin" ><Button variant='outlined'>Sign In</Button></Link>
                </div>
                
              </div>
              {/* second div to render */}
              <div className={`w-full row-span-9 flex flex-col items-center justify-center  ${isEnabled ? 'none' : 'hidden'} overflow-hidden `}>
                <div className='w-[35%] aspect-square overflow-hidden '>
                  <div className=' h-[80%] flex flex-col items-center'>
                    <span className='my-2 text-8xl text-bold protest-strike-regular'>Is this the right Aurora Account?</span> <br/>
                    <span>You'll use this to login as artist on Aurora</span>
                    <div className='my-3 bg-white bg-opacity-45 w-full h-[55%]  rounded-lg flex flex-col items-center '>
                      <div className='h-[60%] my-1 aspect-square rounded-full bg-white overflow-hidden '>
                      <img src='https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png' 
                                    className='w-full h-full object-cover'
                                    alt='Image description'/>
                      </div>
                      <div className='h-[50%] w-full flex flex-col items-center justify-center '>
                        <div className='mb-2'>
                          {cookies.User.name}
                        </div>

                        <div className='mb-2'>
                          {cookies.User.email}
                        </div>
                        <span>Change Account?</span>
                      </div>
                    </div>
                      <div className='h-[10%] grid grid-cols-2  w-full '>
                      <div className='w-50%  flex items-center justify-center'>
                        <Button variant="outlined" color='white' onClick={handleClick}>Go Back</Button>
                      </div>
                      <div className='w-50% flex items-center justify-center'>
                      <Button variant="outlined" color='white' onClick={handleSubmit}>Continue</Button>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          }
    </div>
   
  )
}

export default Ifloggedin