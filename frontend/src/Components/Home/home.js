import React from 'react'
import Headerlayout from '../../Layout/Headerlayout';
import Bodylayout from '../../Layout/bodylayout';
import Container from '../Container/Container';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className='grid h-screen grid-rows-[8%,92%] relative scrollbar-none gap-2 '>
      {/*<div className=' place-content-center' >
        <Headerlayout/> 
      </div>
          */}
      <div className=' min-h-screen place-items-center '>
        <Bodylayout>
              <Container>
                <Footer/>
              </Container>
        </Bodylayout>
      </div>
    </div>
  )
}

export default Home