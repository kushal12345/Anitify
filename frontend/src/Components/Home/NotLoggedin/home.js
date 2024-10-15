import React from 'react'
import Bodylayout from '../../../Layout/bodylayout';
import Container from '../../Container/Container';

const Home = () => {
  return (
    <div className='grid min-h-screen  grid-rows-[8%,40%] relative scrollbar-none gap-2 bluetopurple text-gray-900'>
      <div className=' h-auto  place-items-center '>
        <Bodylayout>
              <Container/>
        </Bodylayout>
      </div>
    </div>
  )
}

export default Home