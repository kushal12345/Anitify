import React, { useEffect, useState, useContext } from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { baseURL } from '../../Services/config';
import AuthContext from '../Hooks/Auth/AuthContext';
import api from '../../Services/api';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import FetchUser from '../Functions/Fetchuser';
import { useCallback } from 'react';
import usePagination from '../Pagination/Pagination';
import { MdFormatListBulletedAdd } from "react-icons/md";
import Button from '@mui/material/Button';
import fetchAlbums from '../Functions/Fetchalbums';

const Artistpage = ({ setsecondPage, show }) => {

    const data = show?show:null;
    const [albumpara1,setalbumpara1] = useState(null);
    const [albumpara2,setalbumpara2] = useState(null);

    useEffect(()=>{
        fetchAlbums(data._id,setalbumpara1,setalbumpara2);
    },[fetchAlbums,data,setalbumpara1,setalbumpara2]);
    

    const convertDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    };

    return (
        <div className='h-[90%] overflow-hidden grid grid-rows-8 grid-flow-col gap-1'>
            <div className='w-full overflow-hidden p-2 row-span-3 bg-white bg-opacity-25 text-white rounded-xl'>
                <div className='w-full mb-2 hover:cursor-pointer' onClick={() => { setsecondPage(false) }}>
                    <FaArrowLeft />
                </div>
                <div className="flex items-center gap-4">
                    <img
                        alt="Album cover"
                        className="aspect-square rounded-md object-cover"
                        src={data.image?`${baseURL}/${data.name}/profile/${data.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'}
                        style={{ height: '15%', width: '15%' }}
                    />

                    <div>
                        <h1 className="text-3xl font-bold">{data?data.name:'Unknown Artist'}</h1>
                        <p className="text-sm my-2 text-muted-foreground">Bio: {data?data.bio:"bio still empty"}</p>
                        <p className="text-sm my-2 text-muted-foreground">Total Albums: {data?data.albums.length:"0"} albums</p>
                        <p className="text-sm my-2 text-muted-foreground">Region: {data?data.country:" "}</p>
                        <div className='mt-5 w-auto flex items-center ' >
                           {/* CI heart is empty heart and Faheart is liked one */}
                           <Button variant="contained" color='success' >Follow</Button>
                           {/*  liked? <FaHeart onClick={()=>{handleLikeClick('album',albums._id)}} size={24} /> : <CiHeart onClick={()=>{handleLikeClick('album',albums._id)}} size={24} /> */}
                            <p className='mx-4'>{0} Followers</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='w-full h-auto row-span-5 px-2 mb-9 pb-3'>
                <div className="h-1/5 mt-6 space-y-1">
                    <h2 className="text-5xl font-semibold tracking-tight">Albums</h2>
                    <p className="text-sm text-muted-foreground">Top trending albums.</p>
                </div>
                <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-3/5 pr-4">
                    <div className="space-y-2">
                    {albumpara2 && albumpara2.map((track, index) => {
                            const { hours, minutes, seconds } = convertDuration(track.duration || 0); // Use track.duration directly
                            return (
                                <div key={index} className="flex items-center gap-4 cursor-pointer">
                                    <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                                    <div className="h-10 flex items-center w-10">
                                        <RxAvatar alt="Song cover" />
                                    </div>
                                   
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading -none">{track.title}</p>
                                    </div>

                                    {/* Like Track Button */}
                                    <div className='flex-1 flex items-center'>
                                    {/*trackliked[track._id] ? (
                                            <FaHeart onClick={() => { handleLikeClick('track', track._id); }} size={24} />
                                        ) : (
                                            <CiHeart onClick={() => { handleLikeClick('track', track._id); }} size={24} />
                                        )*/}                                        
                                        <p className='mx-4'>{/*tracklikeCounter && tracklikeCounter[track._id] !== undefined ? tracklikeCounter[track._id] : 0*/} 0 Likes</p>
                                        </div>
                                     {/* ADD to Playlist Button */}
                                    <div className='  flex items-center'>
                                        <MdFormatListBulletedAdd size={24}/>
                                        <p className='mx-4'> Add to Library</p>
                                    </div>

                                    <div className="text-sm text-muted-foreground">{`${hours}:${minutes.toString().padStart(2, '0')}`}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Pagination Button*/}
               {/* <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>*/}
            </div>
        </div>
    );
};

export default Artistpage;