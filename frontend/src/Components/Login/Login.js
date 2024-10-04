import React ,{useContext}from 'react';
import { Card, CardContent,CardActions, Typography, Button, TextField,Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import AuthContext from '../Hooks/Auth/AuthContext';
import Loading from '../Loading/Loading';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const API_ADDRESS = `https://anitify-api.vercel.app`;
    const navigate = useNavigate();
    const {login}=useContext(AuthContext);

    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(user.email && user.password){
            try {
                api.post(`/api/login`,user)
                .then(res => {
                     if(res.data.success===true){
                        login(res.data);
                        snackbar.current.setAlert(`Welcome Back ${res.data.user.name} `,"success");
                        
                        const timerId = setTimeout(()=>{
                            navigate('/home');
                        },1500);
                        
                        return () => clearTimeout(timerId);                        
                     }else{
                        snackbar.current.setAlert(res.data.message,"error");
                     }   
                })
                .catch(error => {
                    
                   // console.log(error);
                  snackbar.current.setAlert(`${error.response.data.message}`,"error");
                })
                .finally(() => {
                    setLoading(false);
                    });
            } catch (error) {
                console.log(`${API_ADDRESS} not found`);
                console.log(`Error part ${error.json}`);
                snackbar.current.setAlert(`${API_ADDRESS} not found`, "error");
                setLoading(false); 
            }
        }else{
            console.log("Please fill in  all the details");
            snackbar.current.setAlert("Please fill in all the details","error")
            setLoading(false);
        }
    }

    const snackbar = useRef(null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
        <SnackbarAlert ref={snackbar}/>
      {
        loading ?
          <Loading/>
        :
        <div>
            <Card className="w-4/3 max-w-md shadow-lg p-5 px-8">
                <Box>
                    <Link to="/">
                        <ArrowBackIcon/>
                    </Link>
                </Box>
                <CardContent className=' flex items-center justify-center text-black'>
                    
                    <Box>
                        <Typography  component="div" color="black" fontWeight="bold" fontSize="1.5rem" className='py-2 flex items-center justify-center '>
                            Login
                        </Typography>
                        <Typography variant="body2" color="black" className='flex items-center justify-center'>
                            Enter credentials to access your account
                        </Typography>
                    </Box>
                </CardContent>
                <CardContent  className=' ' sx={{padding:0,margin:0}}>
                <form>
                    <div className="">
                    <div className="">
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
                        value={user.name}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="">          
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="current-password"
                            placeholder="********"
                            label="Password"
                            variant="standard"
                            sx={{ width: '100%' }}
                            value={user.password}
                            onChange={handleChange}
                            />
                    </div>
                    </div>
                </form>
                </CardContent>
                
                <CardActions className='flex items-center justify-center'>
                    <Button variant="outlined" type='submit' onClick={handleSubmit} >
                        Sign In
                    </Button>
                </CardActions>
            </Card>
        </div>        
      }
      
    </div>
  )
}

export default Login