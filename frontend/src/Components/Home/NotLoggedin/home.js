import React, { useState } from 'react';
import Bodylayout from '../../../Layout/bodylayout';
import Container from '../../Container/Container';
import AdminAlbum from '../admin/Album/AdminAlbum';
import Artistpage from '../../Artist/Artistpagedetail';

const PAGE_ALBUMS = "albums";
const PAGE_ARTIST = "artist";
const PAGE_HOMENOTLOGGED = "homenotlogged";

const Home = () => {
  const [secondpage, setsecondPage] = useState(null);
  const [show, setshow] = useState([]);

  const renderPage = () => {
    switch (secondpage) {
      case PAGE_ALBUMS:
          return <AdminAlbum setsecondPage={setsecondPage} show={show} />;
       
      case PAGE_ARTIST:
          return <Artistpage setsecondPage={setsecondPage} show={show} setshow={setshow} />;

      case PAGE_HOMENOTLOGGED:
        return <Container setsecondPage={setsecondPage} setshow={setshow} />;
      default:
        return <Container setsecondPage={setsecondPage} setshow={setshow} />;
    }
  };

  return (
    <div className='grid min-h-screen grid-rows-[8%,40%] relative scrollbar-none gap-2 bluetopurple text-gray-900'>
      <div className='h-auto place-items-center'>
        <Bodylayout>
          {renderPage()}
        </Bodylayout>
      </div>
    </div>
  );
};

export default Home;