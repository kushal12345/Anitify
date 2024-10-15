import React from 'react'
import { Button } from '@mui/material'
import Addtrack from './Artist/Addtrack'

const Popover = ({ onClose }) => {

  return (
    <div>
        <div className='absolute top-0 left-0 w-screen h-screen bg-white bg-opacity-30 backdrop-filter backdrop-blur-md'  onClick={onClose}></div>
          <div className='absolute top-0 left-0 flex items-center justify-center  w-screen h-screen  border border-white' >
            <div className='w-2/6 aspect-square rounded-xl overflow-hidden p-3 bg-white bg-opacity-60 backdrop-blur-lg shadow-xl'>
             <Addtrack onClose={onClose}/>
            </div>
          </div>
    </div>
  )
}

export default Popover