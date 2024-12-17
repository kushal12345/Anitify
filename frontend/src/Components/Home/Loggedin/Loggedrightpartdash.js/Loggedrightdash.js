import React,{useState} from 'react'
import Loggedrightpart from "../../../Rightpart/Loggedin/Loggedrightpart.js";
import AdminAlbum from '../../admin/Album/AdminAlbum.js';
import Artistpage from '../../../Artist/Artistpagedetail.js';

const PAGE_ALBUMS = "albums";
const PAGE_ARTIST = "artist";
const PAGE_HOMELOGGED = "homelogged";

const Loggedrightdash = () => {
    const [secondpage , setsecondPage] = useState(null);
    const [show, setshow] = useState([]);

    const renderPage = () => {
      switch (secondpage) {
        case PAGE_ALBUMS:
          return <AdminAlbum setsecondPage={setsecondPage} show={show} />;
        case PAGE_ARTIST:
          return <Artistpage setsecondPage={setsecondPage} show={show}  setshow={setshow}/>;
        case PAGE_HOMELOGGED:
          return <Loggedrightpart setsecondPage={setsecondPage} setshow={setshow} />;
        default:
          return <Loggedrightpart setsecondPage={setsecondPage} setshow={setshow} />;
      }
    };
  

  return (
    <div className='h-full p-2  -z-[1] overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      {renderPage()}
    </div>
  )
}

export default Loggedrightdash