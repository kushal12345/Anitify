import React,{useState} from 'react'
import Loggedrightpart from "../../../Rightpart/Loggedin/Loggedrightpart.js";
import AdminAlbum from '../../admin/Album/AdminAlbum.js';

const Loggedrightdash = () => {
    const [secondpage , setsecondPage] = useState(null);
    const [show, setshow] = useState([]);

  return (
    <div className='h-full p-2  -z-[1] overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
         {
                (secondpage==="albums") ? (
                  <AdminAlbum setsecondPage={setsecondPage} show={show}/>
                ): /*(secondpage==="artist") ? (
                  <p>artist page</p>
                ):*/(secondpage==="homelogged") ? (
                  <Loggedrightpart setsecondPage={setsecondPage} setshow={setshow}/>
                ): (
                  <Loggedrightpart setsecondPage={setsecondPage} setshow={setshow}/>
                )
              }
    </div>
  )
}

export default Loggedrightdash