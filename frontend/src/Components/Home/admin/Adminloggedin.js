import React from 'react'
import AuthContext from '../../Hooks/Auth/AuthContext'
import { useContext } from 'react'

const Adminloggedin = () => {
  const {cookies} = useContext(AuthContext);

  return (
    <div className="h-screen mb-10 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
     
      
    </div>
  )
}

export default Adminloggedin