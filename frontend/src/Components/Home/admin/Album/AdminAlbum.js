import React, { useEffect, useState, useContext } from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { baseURL } from '../../../../Services/config';
import AuthContext from '../../../Hooks/Auth/AuthContext';
import api from '../../../../Services/api';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const AdminAlbum = ({ setsecondPage, show }) => {
    const { cookies } = useContext(AuthContext);
    const [tracks, setTracks] = useState(Array(1).fill(0));
    const [totaltrack,settotaltrack] = useState(null);
    const [totaltime,settotaltime] = useState(null);
    const [albumid,setalbumid] = useState(null);
    const [liked,setliked] = useState(false);
    const [likecounter, setlikecounter] = useState(0); 
    
    
    const likerequest = async (newliked) => {
        //setliked(newliked);
        console.log("like status changed to ",newliked);
        try {
            await api.post(`/api/Likealbums/${show._id}`,{newliked})
            .then((response)=>{
                const result = response.data.likeCount
                console.log(result);
                
                setlikecounter(result.likecount);
            })
            .catch((error)=>{
                console.log(error)
                })
            
        } catch (error) {
            console.log(error);
        }
    }

    const handlelikeclick = () => {
        setliked(prevLiked => {
            const newliked = !prevLiked;
            console.log(newliked);
            likerequest(newliked);
            return newliked;
        })
    }

    useEffect(() => {
        const fetchtracks = async () => {
            try {
                const response = await api.get(`/api/tracks/${cookies.User._id}/${show.title}`);
                const tracks = response.data;
                tracks.result ? setTracks(tracks.result) : setTracks(Array(1).fill(0));
            } catch (error) {
                console.log('Error fetching album:', error);
            }
        };
        
        const fetchLike = async () => {
            console.log(show._id);
            try {
                const response = await api.get(`/api/album/likestatus/${show._id}`);
                const likes = response.data.result;
                likes[0] ? setliked(likes[0].likestate):setliked(false); 
                likes[0] ? setlikecounter(likes[0].likecount) : setlikecounter(0);
                console.log(likes);
                console.log(liked);
                console.log(likecounter);
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchLike();
        fetchtracks();
        
    }, [cookies.User._id, show]);

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
                        src={`${baseURL}/${cookies.User.name}/${show.title}/${show.image}`}
                        style={{ height: '15%', width: '15%' }}
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{show.title}</h1>
                        <p className="text-sm text-muted-foreground">{cookies.User.name} • 2023 • 12 songs, 48 min</p>
                        <div className='mt-5 w-auto flex items-center ' onClick={handlelikeclick}>
                           {/* CI heart is empty heart and Faheart is liked one */}
                           { liked? <FaHeart size={24} /> : <CiHeart size={24} /> }
                            <p className='mx-4'>{likecounter} Likes {liked?"1":"0"}</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='w-full h-auto row-span-5 px-2 mb-9 pb-3'>
                <div className="h-1/5 mt-6 space-y-1">
                    <h2 className="text-5xl font-semibold tracking-tight">Songs</h2>
                    <p className="text-sm text-muted-foreground">A list of songs from the album.</p>
                </div>
                <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-4/5 pr-4">
                    <div className="space-y-2">
                        {tracks.map((track, index) => {
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
                                    <div className="text-sm text-muted-foreground">{`${hours}:${minutes.toString().padStart(2, '0')}`}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAlbum;