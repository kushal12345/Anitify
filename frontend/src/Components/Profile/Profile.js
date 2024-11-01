import React from 'react'
import Playbar from '../Playbar/Playbar'
import ArtistProfile from './Artist/ArtistProfile'

const Profile = () => {
  return (
    <div className='h-screen  bluetopurple'>
      <div className='grid grid-cols-10 h-[90%] overflow-hidden gap-2'>
        <ArtistProfile/>
      </div>
     <div className='w-full h-[10%]'>
       <Playbar/>
      </div>
    </div>
  )
}

export default Profile