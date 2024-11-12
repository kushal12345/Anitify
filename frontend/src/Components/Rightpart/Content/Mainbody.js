import React from 'react'
import Popularartist from './Popularartist'
import Popularalbums from './Popularalbums'
const Mainbody = ({setsecondPage, setshow}) => {
  return (
    <div className='h-auto  grid grid-rows-1' >
        <div className=''>
          <Popularartist setsecondPage={setsecondPage}  setshow={setshow}/>
        </div>

        <div>
          <Popularalbums setsecondPage={setsecondPage}  setshow={setshow}/>
        </div> 
    </div>
  )
}

export default Mainbody