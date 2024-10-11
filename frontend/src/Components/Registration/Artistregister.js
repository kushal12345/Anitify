import React, { useState, useRef } from 'react';
//import { TbBrandSpotify } from "react-icons/tb";
import { Link } from 'react-router-dom';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import Loading from '../Loading/Loading';
import { useContext } from 'react';
import AuthContext from '../Hooks/Auth/AuthContext';
import Ifloggedin from './Artist/Ifloggedin';

const ArtistRegister = () => {
  const API_ADDRESS = `https://anitify-api.vercel.app`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {cookies} = useContext(AuthContext);


  const snackbar = useRef(null);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <SnackbarAlert ref={snackbar} />
     
      <div>
        {
            (cookies.Token===null)?
            <div>
                {
                    loading?
                    <Loading/>
                    :
                    navigate('/login')
                }
            </div>
            :
            <div className='text-black'>
                <Ifloggedin/>
            </div>
        }
      </div>
      
    </div>
  )
}

export default ArtistRegister

