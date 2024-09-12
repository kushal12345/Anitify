import React, { useState, useRef } from 'react';
//import { TbBrandSpotify } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, TextField, Box, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';

const Register = () => {
  const API_ADDRESS = `http://localhost:9000`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


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
      <div className='w-full'>
          <div className=" w-full flex justify-center items-center h-screen bg-gray-100">
        <svg className="animate-spin h-16 w-16" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="url(#spinner-gradient)"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      </div>
      :
      <div>
     
     <Card className=" w-4/3 max-w-md shadow-lg p-5 px-8"> 
             <Box>
                      <Link to="/">
                         <ArrowBackIcon/>
                     </Link>
             </Box>
             <CardContent className="flex items-center justify-center">
               <Box>
                 <Typography  component="div" color="black" fontWeight="bold" fontSize="1.5rem" className=' flex items-center justify-center '>
                         Register
                 </Typography>
                 <Typography variant="body2" color="black" className="flex items-center justify-center">
                   Enter your credentials to create an account
                 </Typography>
               </Box>
             </CardContent>
             <CardContent sx={{ padding: 0, margin: 0 }}>
               <form>
                 <div className="  ">
                   <div className="py-2">
                     <TextField
                       label="Full Name"
                       variant="standard"
                       id="name"
                       name='name'
                       placeholder="John Doe"
                       type="text"
                       autoCapitalize="none"
                       autoComplete="name"
                       autoCorrect="off"
                       sx={{ width: '100%' }}
                       value={user.name}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="py-2">          
                     <TextField
                       label="Email"
                       variant="standard"
                       id="email"
                       name='email'
                       placeholder="m@example.com"
                       type="email"
                       autoCapitalize="none"
                       autoComplete="email"
                       autoCorrect="off"
                       sx={{ width: '100%' }}
                       value={user.email}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="py-2">          
                     <TextField
                       label="Password"
                       variant="standard"
                       id="password"
                       name='password'
                       type="password"
                       autoCapitalize="none"
                       autoComplete="current-password"
                       placeholder="********"
                       sx={{ width: '100%' }}
                       value={user.password}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="py-2">          
                     <TextField
                       label="Confirm Password"
                       variant="standard"
                       id="cpassword"
                       name='cpassword'
                       type="password"
                       autoCapitalize="none"
                       autoComplete="current-password"
                       placeholder="********"
                       sx={{ width: '100%' }}
                       value={user.cpassword}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="py-2"> 
                     <TextField
                       select
                       label="Country"
                       variant="standard"
                       id="country"
                       name='country'
                       value={user.country}
                       onChange={handleChange}
                       sx={{ width: '100%',color:'black' }}
                       required
                     >
                       <MenuItem sx={{ color: 'black' }} value=""><em>Select a country</em></MenuItem >
                       {countries.map((country, index) => (
                         <MenuItem sx={{ color: 'black' }}  key={index} value={country.name}>{country.name}</MenuItem >
                       ))}
                     </TextField>
                   </div>
                 </div>
               </form>
             </CardContent>
             <CardActions className="flex items-center justify-center">
               <Button variant="outlined" type="submit" onClick={handleSubmit}>
                 Sign Up
               </Button>
             </CardActions>
           </Card>
      </div>
      }
      
    </div>
  )
}

export default Register

