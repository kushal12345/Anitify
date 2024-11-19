import React from 'react'
import { useContext } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import Usersidebar from './User/Usersidebar';
import ArtistSidebar from './Artist/ArtistSidebar';
import { ProtectRoutes } from '../../Hooks/Protectroutes/protect';
const LoggedLibrary = ({setplaylistpage}) => {

   
    const {cookies} = useContext(AuthContext);

    

  return (
    <div className=' w-full  h-full '>
        {
            (cookies.Authority==='artist')?
            <ProtectRoutes><ArtistSidebar setplaylistpage={setplaylistpage}/></ProtectRoutes>
            :
            <ProtectRoutes><Usersidebar setplaylistpage={setplaylistpage}/></ProtectRoutes>
        }
           
    </div>
  )
}

export default LoggedLibrary