import React from 'react'

const Container = ({children}) => {
  return (
    <div className=''>
        <div className='border border-solid  '>
            Container
        </div>
       
        <div className='border border-solid '>
            {children}
        </div>
    </div>
  
  )
}

export default Container