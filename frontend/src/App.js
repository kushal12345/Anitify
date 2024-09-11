import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Homeindex from './Components/Home/Homeindex.js';
import Register from './Components/Registration/Register';
import Login from './Components/Login/Login';


const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Homeindex />} />
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />}/>
        </Routes>
    </Router>
  )
}

export default App