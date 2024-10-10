import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='text-white bg-white bg-opacity-20 rounded-xl w-full h-[40vh] '>
      <div className='w-full h-3/5 my-5 px-3 grid grid-cols-5  '>
        {
          Array(5).fill(0).map((_,index)=>{
            return(
              <div className='w-full  h-full flex justify-center' key={index}>
                  <span className='leading-8 font-bold' >Main header</span>
                  
                  

              </div>
            );
          })
        }
      </div>
      <div className='h-[1/5] px-3 my-2 flex justify-center w-full'>
        <span>
          Are you an <Link to="/ArtistRegister"> Artist</Link><br/>
        </span>
      </div>
      <div className='h-[1/5] px-3 flex justify-center w-full'>
        <span>@2024 Aurora</span>
      </div>
    </div>
  )
}

export default Footer