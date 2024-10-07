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


  const countries = [
    {
      "name": "Nepal",
      "code": "NP"
    },
    {
      "name": "India",
      "code": "IN"
    }
  ];

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    country: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.name && user.email && user.password && user.cpassword && user.country) {
      if (user.password === user.cpassword) {
        try {
          api.post(`/api/register`, user)
            .then(res => {
              console.log(res.data);
              snackbar.current.setAlert("Sucessfully Registered", "success");
              const timerId = setTimeout(() => {
              navigate("/");
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
      } else {
        console.log("password and confirmed password didn't matched");
        snackbar.current.setAlert(`Password and Confirm password didn't matched`, "error");
        setLoading(false);
      }
    } else {
      console.log("Please input all data");
      snackbar.current.setAlert(`Please input all data`, "error");
      setLoading(false);
    }
  }

  const snackbar = useRef(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <SnackbarAlert ref={snackbar} />
      {loading?
      <Loading/>
      :
      <div>
        {
            (cookies.User.token===null)?
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
      }
      
    </div>
  )
}

export default ArtistRegister

