import React from 'react'
import Popularartist from './Popularartist'
import Popularalbums from './Popularalbums'
const Mainbody = () => {
  return (
    <div className='h-auto inline-block  grid grid-rows-2' >
        <div>
          <Popularartist/>
        </div>

        <div>
          <Popularalbums/>
        </div>  
    </div>
  )
}

export default Mainbody