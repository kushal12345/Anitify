import React,{useState,useRef} from 'react'
import Loading from '../../Loading/Loading';
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../SnackbarAlert/SnackbarAlert';
import Loginart from './Loginart';

const Artistlogin = () => {
  const {cookies} = useContext(AuthContext);
  const navigate = useNavigate();
  const snackbar = useRef(null);
  const [loading, setLoading] = useState(false);

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
                <Loginart/>
            </div>
        }
      </div>    
    </div>
  )
}

export default Artistlogin