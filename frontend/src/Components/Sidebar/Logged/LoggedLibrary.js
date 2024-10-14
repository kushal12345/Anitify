import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import Usersidebar from './User/Usersidebar';
import ArtistSidebar from './Artist/ArtistSidebar';

const LoggedLibrary = () => {

   
    const {cookies} = useContext(AuthContext);

    

  return (
    <div className=' w-full  h-full '>
        {
            (cookies.Authority==='artist')?
            <ArtistSidebar/>
            :
            <Usersidebar/>
        }
           
    </div>
  )
}

export default LoggedLibrary