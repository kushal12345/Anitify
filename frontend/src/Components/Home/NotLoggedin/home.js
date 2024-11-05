import React, { useState } from 'react'
import Bodylayout from '../../../Layout/bodylayout';
import Container from '../../Container/Container';
import AdminAlbum from '../admin/Album/AdminAlbum';
import Loading from '../../Loading/Loading';
const Home = () => {
  const [secondpage , setsecondPage] = useState(null);
  const [show, setshow] = useState([]);
  return (
    <div className='grid min-h-screen  grid-rows-[8%,40%] relative scrollbar-none gap-2 bluetopurple text-gray-900'>
      <div className=' h-auto  place-items-center '>
        <Bodylayout>
              {
                (secondpage==="albums") ? (
                  <AdminAlbum setsecondPage={setsecondPage} show={show}/>
                
                ): /*(secondpage==="artist") ? (
                  <p>artist page</p>
                ):*/(secondpage==="homenotlogged") ? (
                  <Container setsecondPage={setsecondPage} setshow={setshow}/>
                ): (
                  <Container setsecondPage={setsecondPage} setshow={setshow}/>
                )
              }
        </Bodylayout>
      </div>
    </div>
  )
}

export default Home