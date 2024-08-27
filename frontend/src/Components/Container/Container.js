import React from 'react'

const Container = ({children}) => {
  return (
    <div className='min-h-screen p-2 rounded-xl tertiary_bg '>
        <div className=' min-h-[80vh]  '>
            Container
        </div>
       
        <div className=' min-h-[20vh] '>
            {children}
        </div>
    </div>
  
  )
}

export default Container