import React,{useContext, useState, useEffect} from 'react'
import { BiLibrary } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Library from './Notlogged/Library';
import Logohomesearch from './Notlogged/Logohomesearch';
import AuthContext from '../Hooks/Auth/AuthContext';
import LoggedLibrary from './Logged/LoggedLibrary';
import { Button } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import FetchArtist from '../Functions/Fetchartist';
import { baseURL } from '../../Services/config';

const Sidebar = ({ setSidebarOpen }) => {
    const {cookies} = useContext(AuthContext);
    const Userlogged = cookies.User 
    const [image,setimage] = useState("");
    const [formData,setFormData] = useState({
        country:"",
        email:"",
        bio:"",
        name:"",
        image:""
      });

      useEffect(()=>{
        if(Userlogged){
            FetchArtist(cookies.User._id,setFormData);
        }
        setimage(formData.image);
      },[cookies,setFormData,setimage,formData,Userlogged])

    return (
        <div className='h-[90%] w-full text-white text-sm overflow-hidden  sidebar'>

            <div className={`flex items-center w-full px-4 ${Userlogged?"":"hidden"}`}>
                    <div className="relative bg-white w-24 h-24 mr-4 rounded-full overflow-hidden border border-gray-300">
                        <img 
                            src={image ? `${baseURL}/${cookies.User.name}/profile/${image}` : "https://placehold.co/50x50"} 
                            alt="User  profile" 
                            className="w-full h-full object-cover  rounded-full" 
                        />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-red-600 transition duration-300"></div>
                    </div>
                <div className='h-full'>
                    <span className="text-lg font-bold">{(Userlogged)?formData.name:""}</span>            
                </div>
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
                    <div className=" flex pr-4 justify-between  items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <BiLibrary className="font-bold text-[1.4rem]" />
                            <span className='font-bold text-lg'>Your library</span>
                        </div>
                        <button className="rounded-2xl mx-2 px-1 bg-accent-blue hover:shadow-md hover:bg-black/25 aspect-square rounded-[50%]">
                            <FaPlus className="font-bold text-[0.8rem]" />
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