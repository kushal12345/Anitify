import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Register from './Components/Registration/Register';
import Login from './Components/Login/Login';
import { ProtectRoutes } from './Components/Hooks/Protectroutes/protect.js';
import Home from './Components/Home/NotLoggedin/home.js';
import Homeloggedin from './Components/Home/Loggedin/Homeloggedin.js';
import ArtistRegister from './Components/Registration/Artistregister.js';
import Artistlogin from './Components/Login/Login/Artistlogin.js';

const App = () => {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />}/>
            <Route path="/ArtistRegister" element={<ProtectRoutes><ArtistRegister /></ProtectRoutes>} />
            <Route path="/Artistlogin" element={<ProtectRoutes><Artistlogin/></ProtectRoutes>} />
            <Route path="/home" element={<ProtectRoutes><Homeloggedin/></ProtectRoutes> }/>
        </Routes>
  )
}

export default App