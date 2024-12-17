import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import Usersidebar from './User/Usersidebar';
import ArtistSidebar from './Artist/ArtistSidebar';
import { ProtectRoutes } from '../../Hooks/Protectroutes/protect';

const LoggedLibrary = ({setplaylistpage, setfdata}) => {

   
    const {cookies} = useContext(AuthContext);

    

  return (
    <div className=' w-full  h-full '>
        {
            (cookies.Authority==='artist')?
            <ProtectRoutes><ArtistSidebar setplaylistpage={setplaylistpage} setfdata={setfdata}/></ProtectRoutes>
            :
            <ProtectRoutes><Usersidebar setplaylistpage={setplaylistpage} setfdata={setfdata}/></ProtectRoutes>
        }
           
    </div>
  )
}

export default LoggedLibrary