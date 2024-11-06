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
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState(show ? show[0] : null);
    const [artist, setArtist] = useState(show[1] ? show[1] : null);
    const [liked, setLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0); 

    const [User  , setUser  ] = useState({
        _id: "",
        name: ""
    });

  
    // Set user based on cookies or artist
    useEffect(() => {
       if (artist) {
            setUser  ({
                _id: artist._id,
                name: artist.name
            });
        }
    }, [ artist]);

    const likerequest = async (newLiked) => {
        console.log("like status changed to ", {newLiked});
        try {
            const response = await api.post(`/api/Likealbums/${albums._id}`, {"newLiked": newLiked,"Authority": cookies.Authority});
            const result = response.data.likeCount;
            console.log(result);
            setLikeCounter(result.likecount);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLikeClick = () => {
        if(cookies.User && artist.name ){
            (cookies.User.name===artist.name)?
                        setLiked(prevLiked => {
                            const newLiked = !prevLiked;
                            console.log(newLiked);
                            likerequest(newLiked);
                            return newLiked;
                        })
                        :
                        setLiked(() => {
                            likerequest(null);
                            return null;
                        });
        }else{
            setLiked(prevLiked => {
                likerequest(prevLiked);
                return prevLiked;
            });
        }
        
    };


    // Fetch tracks based on user and albums
    useEffect(() => {
        const fetchTracks = async () => {
            if (User._id && albums) {
                try {
                    const response = await api.get(`/api/tracks/${User._id}/${albums.title}`);
                    const tracks = response.data;
                    setTracks(tracks.result || []);
                } catch (error) {
                    console.log('Error fetching album:', error);
                }
            }
        };
        fetchTracks();
    }, [User , albums, artist]);

    // Fetch likes
    useEffect(() => {
        const fetchLike = async () => {
            if (albums && albums._id) {
                try {
                    const response = await api.get(`/api/album/likestatus/${albums._id}`);
                    const likes = response.data.result;
                    console.log(likes[0]);
                    if (likes && likes.length > 0) {
                        setLiked(likes[0].likestate);
                        setLikeCounter(likes[0].users.length);
                    } else {
                        setLiked(false);
                        setLikeCounter(0);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchLike();
    }, [albums,setLikeCounter,setLiked]);


    // Function to convert duration from milliseconds to hours, minutes, and seconds
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
                        src={`${baseURL}/${User.name}/${albums.title}/${albums.image}`}
                        style={{ height: '15%', width: '15%' }}
                    />

                    <div>
                        <h1 className="text-3xl font-bold">{albums?.title || 'Unknown Album'}</h1>
                        <p className="text-sm text-muted-foreground">{User.name || 'Unknown Artist'}  • 2023 • 12 songs, 48 min</p>
                        <div className='mt-5 w-auto flex items-center ' >
                           {/* CI heart is empty heart and Faheart is liked one */}
                           {  liked? <FaHeart onClick={handleLikeClick} size={24} /> : <CiHeart onClick={handleLikeClick} size={24} /> }
                            <p className='mx-4'>{likeCounter} Likes</p>
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