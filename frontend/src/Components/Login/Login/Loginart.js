import React,{useState, useRef} from 'react'
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import api from '../../../Services/api';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const Loginart = () => {
    const API_ADDRESS = `https://anitify-api.vercel.app`;
    const {cookies} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
 
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      if(cookies.User){
        try {
          api.post(`/api/artistregister/${cookies.User._id}`)
          .then(res=>{
            //console.log(res.data)
            snackbar.current.setAlert("Sucessfully Registered", "success");
            const timerId = setTimeout(() => {
            navigate("/home");
            }, 3000);
            return () => {
              clearTimeout(timerId);
            };  
          })
          .catch(error => {
            //console.log(error.response.data.message);
            snackbar.current.setAlert(`${error.response.data.message}`, "error");
          })
          .finally(() => {
            setLoading(false); // set loading to false when the request is complete
          });
        } catch (error) {
            //console.log(`${API_ADDRESS} not found`);
            //console.log(`Error part ${error.json}`);
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
        
        <div className={`w-full row-span-9 flex flex-col items-center justify-center overflow-hidden `}>
          <div className='w-[35%] aspect-square overflow-hidden '>
            <div className=' h-[80%] flex flex-col items-center'>
              <div className='my-3 bg-white bg-opacity-45 w-full h-full  rounded-lg flex flex-col items-center '>
                
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

export default Loginart