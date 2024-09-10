import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home/home';
import Register from './Components/Registration/Register';
import Login from './Components/Login/Login';


const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />}/>
        </Routes>
    </Router>
  )
}

export default App