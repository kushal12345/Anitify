import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[40vh] '>
      <div className='w-full h-4/5 my-5 px-3 grid grid-cols-5 '>
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

      <div className='h-[1/5] px-3 flex justify-center w-full'>
        <span>@2024 Aurora</span>
      </div>
    </div>
  )
}

export default Footer