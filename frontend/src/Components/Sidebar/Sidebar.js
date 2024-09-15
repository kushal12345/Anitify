import React,{useContext,useEffect} from 'react'
import { BiLibrary } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Library from './Notlogged/Library';
import Logohomesearch from './Notlogged/Logohomesearch';
import AuthContext from '../Hooks/Auth/AuthContext';

const Sidebar = () => {
    const {cookies} = useContext(AuthContext);
        
    return (
        <div className='h-auto sidebar'>
        {
            (cookies.User.user)?
            <>
            
            </>

            :

            <>
                <Logohomesearch/>
            </>
        }    
        

        <div className='p-2 rounded-xl h-auto text-white min-h-[calc(100vh-18vh)] h-dvh '>
                    <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <BiLibrary className="font-bold text-[1.4rem]" />
                            <span>Your library</span>
                        </div>
                        <button className="rounded-2xl mx-2 px-1 py-1 bg-accent-blue hover:shadow-md hover:bg-black/25 rounded-[50%] p-2">
                            <FaPlus className="font-bold text-xl" />
                        </button>
                    </div>
                    <Library/>
        </div>
        </div>
    )
}

export default Sidebar