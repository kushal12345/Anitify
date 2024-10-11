import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';
const Ifloggedin = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {cookies} = useContext(AuthContext);
  const handleClick = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className=' w-screen h-screen grid grid-rows-10 '>
      <div className='w-full row-span-1 flex items-center justify-start xs:justify:center sm:justify:center md:justify:start lg:justify:start xl:justify:start'>
        <span className='px-3 text-8xl'>
          For <b>Artist</b> 
        </span>
      </div>
      {/* first div to rendered */}
      <div className={`w-full row-span-9 flex flex-col items-center justify-center ${isEnabled ? 'hidden' : 'none'} `}>
        <span className='my-2 text-8xl text-bold protest-strike-regular' >Claim and Artist Profile</span> <br/>
        <span>If you already have music on Aurora, you can get access to stats, </span>
        <span className='my-2'>pitch tracks to our editors, and more.</span>
        <Button className='my-2 rounded-full ' variant="contained" onClick={handleClick}>Continue</Button>
      </div>
      {/* second div to render */}
      <div className={`w-full row-span-9 flex flex-col items-center justify-center  ${isEnabled ? 'none' : 'hidden'} overflow-hidden `}>
        <div className='w-[35%] aspect-square overflow-hidden '>
          <div className=' h-[80%] flex flex-col items-center'>
            <span className='my-2 text-8xl text-bold protest-strike-regular'>Is this the right Aurora Account?</span> <br/>
            <span>You'll use this to login as artist on Aurora</span>
            <div className='my-5 bg-white bg-opacity-45 w-full h-[55%]  rounded-lg flex flex-col items-center '>
              <div className='h-[50%] my-1 aspect-square rounded-full bg-white overflow-hidden '>
              <img src='https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png' 
                            className='w-full h-full object-cover'
                            alt='Image description'/>
              </div>
              <div className='h-[50%] w-full flex flex-col items-center justify-center '>
                <div className='mb-2'>
                  {cookies.User.name}
                </div>

                <div className='mb-2'>
                  {cookies.User.email}
                </div>
                <span>Change Account?</span>
              </div>
            </div>
              <div className='h-[10%] grid grid-cols-2  w-full '>
              <div className='w-50%  flex items-center justify-center'>
                <Button variant="outlined" onClick={handleClick}>Go Back</Button>
              </div>
              <div className='w-50% flex items-center justify-center'>
              <Button variant="outlined">Continue</Button>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ifloggedin