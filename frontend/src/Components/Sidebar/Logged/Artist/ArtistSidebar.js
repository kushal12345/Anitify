import React, { useState,useEffect } from 'react'
import { BsPinAngleFill } from "react-icons/bs";
import { useContext } from 'react';
import AuthContext from '../../../Hooks/Auth/AuthContext';
import { FaHome, FaSearch, FaBook, FaChartLine, FaUpload } from 'react-icons/fa';
import { IoAlbumsOutline } from "react-icons/io5";
import api from '../../../../Services/api';
import { baseURL } from '../../../../Services/config';
import FetchArtist from '../../../Functions/Fetchartist';
import fetchAlbums from '../../../Functions/Fetchalbums';
import { MdAdd } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa6";



const ArtistSidebar = ({setplaylistpage ,setfdata}) => {

    const {cookies} = useContext(AuthContext)
    const [albums,setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData,setformData] = useState([]);
    const [finalalbum,setfinalalbum] = useState([]);
    
    useEffect(() => {
        setLoading(true);
        fetchAlbums(cookies.User._id, setformData, setAlbums)
        setLoading(false); // Set loading false after fetch
      }, [cookies]);
      
        
    useEffect(() => {
        //setfinalalbum([albums, artistName]);
        setfinalalbum(formData.result);
      }, [formData]);
      

    
  return (
    <div className='h-full w-full '>
        <div className='w-full'>
          <div className='w-full pl-4'>
                <div className="mb-3 flex  w-full ">
                    <FaHome className="mr-2" /> 
                    <span className="text-sm ">Home</span>
                </div>
                <div className="mb-3  flex w-full">
                    <FaSearch className="mr-2" /> 
                    <span className="text-sm ">Search</span>
                </div>
                <div className="mb-3 flex  w-full">
                    <FaBook className="mr-2" />
                    <span className="text-sm ">Your Library</span>
                </div>
                <div className="mb-3 flex w-full">
                    <FaChartLine className="mr-2" />
                    <span className="text-sm ">Analytics</span>
                </div>
                <div className="mb-3 flex w-full">
                    <FaUpload className="mr-2" />
                    <span className="text-sm ">Upload</span>
                </div>
            </div>
        </div>
        <div className=' h-2/5 mb-5 w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    <div className="flex pr-4 justify-between mb-4 items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <IoAlbumsOutline className="font-bold text-[1.4rem]" />
                            <span className='font-bold text-lg'>Your Playlist</span>
                        </div>
                        <div>
                            <span className='text-sm'>more</span>
                        </div>
                    </div>

         {/* Liked playlist */}
         <div className='bg-white my-1 bg-opacity-20 rounded-sm' onClick={()=>{setplaylistpage(true);setfdata("liked")}}>
                    <div  className=' text-sm flex items-center justify-center w-full h-auto overflow-hidden hover:bg-white hover:bg-opacity-35 hover:rounded-sm hover:cursor-pointer'>
                        {/* Image part  */}
                            <div className='py-1 w-1/4 h-full'>
                                <FaThumbsUp size={32}/>
                            </div> 
                            {/* Playlist Details */}
                            <div className='w-2/3 font-bold'>
                                Liked Playlist
                            </div> 
                    </div> 
        </div>           
        {
            finalalbum && finalalbum.map((album, index) => {
            if (!album || !album.title || !album.image) {
                return null;
            }

                return (
                <div key={index} className='flex text-sm  w-full h-auto overflow-hidden hover:bg-white hover:bg-opacity-35' >
                    {/* Image part  */}
                    <div className='w-1/4 aspect-square p-2'>
                    <img 
                        src={`${baseURL}/${album.artist}/${album.title}/${album.image}`} 
                        className='w-full h-full object-cover' 
                        alt={`${album.title} cover`} 
                    />                    </div> 
                    {/* Playlist Details */}
                    <div className='w-2/3 py-3'>
                    <div className='w-full font-bold flex items-center h-1/2'>
                        {album.title}
                    </div>
                    <div className='flex items-center text-sm w-full h-1/2'>
                        <BsPinAngleFill color='green ' className=''/>
                        <span className=''></span> {album.tracks.length} Tracks 
                        <span className=''>.</span>{album.releaseDate.split('-')[0]}
                    </div>
                    </div> 
                </div>  
                )
            })
        }

                {/* create playlist */}
                <div className='bg-white my-1 bg-opacity-20 rounded-lg'>
                    <div  className=' text-sm flex items-center justify-center w-full h-auto overflow-hidden hover:bg-white hover:bg-opacity-35 hover:rounded-lg hover:cursor-pointer'>
                        {/* Image part  */}
                            <div className='w-1/4 h-full'>
                                <MdAdd size={28}/>
                            </div> 
                            {/* Playlist Details */}
                            <div className='w-2/3 font-bold' onClick={()=>{setplaylistpage(true);setfdata=(null)}}>
                                Create New Playlist
                            </div> 
                    </div> 
                </div>
                
        </div>
    </div>
  )
}

export default ArtistSidebar