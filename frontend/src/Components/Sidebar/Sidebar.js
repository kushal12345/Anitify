import React,{useContext} from 'react'
import { BiLibrary } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Library from './Notlogged/Library';
import Logohomesearch from './Notlogged/Logohomesearch';
import AuthContext from '../Hooks/Auth/AuthContext';
import LoggedLibrary from './Logged/LoggedLibrary';
import { Button } from '@mui/material';
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ setSidebarOpen }) => {
    const {cookies} = useContext(AuthContext);
    const Userlogged = cookies.User 
    
    return (
        <div className='h-[90%] overflow-hidden my-2 sidebar'>

        <div className={`flex items-center w-full px-4 ${Userlogged?"":"hidden"}`}>
          <img src="https://placehold.co/50x50" height="60px" width="60px" alt="User  profile" className="rounded-full mr-4" />
          <span className="text-xl font-bold">{(Userlogged)?Userlogged.name:""}</span>
        </div>
         
         <Button variant="ghost" size="icon" className="lg:invisible text-white md:invisible xl:invisible sm:visible xs:visible" onClick={() => setSidebarOpen(false)}>
            <RxCross2 className='text-white' size={24} />
          </Button>   
        {
            (Userlogged !== undefined)?
            <></>
            :
            <>
                <Logohomesearch/>
            </>
        }    
        
        <div className='px-2 rounded-xl h-screen text-white  h-full '>
                    <div className=" flex pr-4 justify-between mb-4 items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <BiLibrary className="font-bold text-[1.4rem]" />
                            <span className='font-bold text-lg'>Your library</span>
                        </div>
                        <button className="rounded-2xl mx-2 px-1 py-1 bg-accent-blue hover:shadow-md hover:bg-black/25 rounded-[50%] p-2">
                            <FaPlus className="font-bold text-[1.0rem]" />
                        </button>
                    </div>
                    {
            (Userlogged !== undefined)?
            <>
                <LoggedLibrary/>
            </>

            :

            <>
                <Library/>
            </>
        }    
        </div>
        </div>
    )
}

export default Sidebar