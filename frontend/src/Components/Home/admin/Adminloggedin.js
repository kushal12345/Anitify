import React,{useState} from 'react'
import AuthContext from '../../Hooks/Auth/AuthContext'
import { useContext } from 'react'
import AdminDashboard from './Dashboard/AdminDashboard'
import AdminAlbum from './Album/AdminAlbum'

const Adminloggedin = () => {
  const {cookies} = useContext(AuthContext);
  const [secondpage,setsecondPage] = useState(false);
  const [show,setshow] = useState(null);
  return (
    <div className="h-screen mb-10 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
       {
        secondpage?
        <>
          <AdminAlbum setsecondPage={setsecondPage} show={show}/>
        </>
        :
        <>
          <AdminDashboard setsecondPage={setsecondPage} setshow={setshow}/>
        </>
       }
    </div>
  )
}

export default Adminloggedin