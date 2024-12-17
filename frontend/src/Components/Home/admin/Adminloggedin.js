import React,{useState} from 'react';
import AuthContext from '../../Hooks/Auth/AuthContext';
import { useContext } from 'react';
import AdminDashboard from './Dashboard/AdminDashboard';
import AdminAlbum from './Album/AdminAlbum';
import Artistpage from '../../Artist/Artistpagedetail';


const PAGE_ALBUMS = "albums";
const PAGE_ARTIST = "artist";
const PAGE_HOMELOGGED = "dashboard";

const Adminloggedin = () => {
  const {cookies} = useContext(AuthContext);
  const [secondpage,setsecondPage] = useState(false);
  const [show,setshow] = useState(null);

  const renderPage = () => {
    switch (secondpage) {
      case PAGE_ALBUMS:
        return <AdminAlbum setsecondPage={setsecondPage} show={show} />;
      case PAGE_ARTIST:
        return <Artistpage setsecondPage={setsecondPage} show={show} setshow={setshow} />;
      case PAGE_HOMELOGGED:
        return <AdminDashboard setsecondPage={setsecondPage} setshow={setshow} />;
      default:
        return <AdminDashboard setsecondPage={setsecondPage} setshow={setshow} />;
    }
  };


  return (
    <div className="h-screen mb-10 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
       {renderPage()}
    </div>
  )
}

export default Adminloggedin