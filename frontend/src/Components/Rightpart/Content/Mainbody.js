import React from 'react'
import Popularartist from './Popularartist'
import Popularalbums from './Popularalbums'
const Mainbody = () => {
  return (
    <div className='h-dvh overflow-hidden' >
        <Popularartist/>
        <Popularalbums/>
    </div>
  )
}

export default Mainbody