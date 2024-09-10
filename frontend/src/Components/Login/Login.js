import React from 'react';
import { Card, CardContent,CardActions, CardHeader, Typography, Button, TextField,Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
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
                  placeholder="m@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  sx={{ width: '100%' }}
                />
              </div>
              <div className="">          
                <TextField
                     id="password"
                     type="password"
                     autoCapitalize="none"
                     autoComplete="current-password"
                     placeholder="********"
                     label="Password"
                     variant="standard"
                     sx={{ width: '100%' }}
                    />
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardActions className='flex items-center justify-center'>
            <Button variant="outlined" >
                Sign In
            </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Login