import React, { useEffect, useState, useContext } from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { baseURL } from '../../../../Services/config';
import AuthContext from '../../../Hooks/Auth/AuthContext';
import api from '../../../../Services/api';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import FetchArtist from '../../../Functions/Fetchartist';
import Loading from '../../../Loading/Loading';
import FetchUser from '../../../Functions/Fetchuser';
import debounce from '../../../../Middleware/debounce';
import { useCallback } from 'react';
import usePagination from '../../../Pagination/Pagination';


const AdminAlbum = ({ setsecondPage, show }) => {
    const { cookies } = useContext(AuthContext);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState(show ? show : null);
    const [liked, setLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0); 
    const [loading, setloading] = useState(false);
    const [user,setUser] = useState([]);

    //for pagination
    const itemsPerPage = 10;
    const {
        currentItems,
        totalPages,
        currentPage,
        handlePageChange,
    } = usePagination(tracks, itemsPerPage);
    //end pagination

    const likerequest = useCallback(
        debounce(async (newLiked) => {
            console.log("like status changed to ", { newLiked });
            try {
                const response = await api.post(`/api/Likealbums/${albums._id}/${cookies.User ? cookies.User._id : null}`, {
                    "newLiked": newLiked,
                    "Authority": cookies.Authority
                });
                const result = response.data.likeCount;
                setLikeCounter(result.likeCount); // Ensure you are accessing the correct property
            } catch (error) {
                console.log(error);
            }
        }, 300),
        [] // Dependency array for useCallback
    );

       useEffect(()=>{
            FetchUser("all",setUser);
        },[setUser]);


    const handleLikeClick = () => { 

        if(cookies.User && albums.artist ){            
            (cookies.User.name===albums.artist ||  user.some(item => item.name === cookies.User.name) )? 
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
            if (albums) {
                try {
                    const response = await api.get(`/api/tracks/${albums._id}`);
                    const tracks = response.data;
                    setTracks(tracks.result || []);
                } catch (error) {
                    console.log('Error fetching album:', error);
                }
            }
        };
        fetchTracks();
    }, [albums]);

    // Fetch likes
    useEffect(() => {
        const fetchLike = async () => {
            if (albums && albums._id) {
                try {
                    const response = await api.get(`/api/album/likestatus/${albums._id}/${cookies.User?cookies.User._id:null}`);
                    const likes = response.data.result;
                    if (likes && likes.length > 0) {
                        if(response.data.likestatus === true){
                            setLiked(likes[0].likestate);
                        }else{
                            setLiked(null);
                        }
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
    }, [albums,setLikeCounter,setLiked,likeCounter]);


    // Function to convert duration from milliseconds to hours, minutes, and seconds
    const convertDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    };


   

    if(loading) {return(<div className='w-full h-full'><Loading/></div>)}

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
                        src={`${baseURL}/${albums.artist}/${albums.title}/${albums.image}`}
                        style={{ height: '15%', width: '15%' }}
                    />

                    <div>
                        <h1 className="text-3xl font-bold">{albums?.title || 'Unknown Album'}</h1>
                        <p className="text-sm text-muted-foreground">{albums.artist || 'Unknown Artist'}  • 2023 • 12 songs, 48 min</p>
                        <div className='mt-5 w-auto flex items-center ' >
                           {/* CI heart is empty heart and Faheart is liked one */}
                           {  liked? <FaHeart onClick={handleLikeClick} size={24} /> : <CiHeart onClick={handleLikeClick} size={24} /> }
                            <p className='mx-4'>{likeCounter?likeCounter : null} Likes</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='w-full h-auto row-span-5 px-2 mb-9 pb-3'>
                <div className="h-1/5 mt-6 space-y-1">
                    <h2 className="text-5xl font-semibold tracking-tight">Songs</h2>
                    <p className="text-sm text-muted-foreground">A list of songs from the album.</p>
                </div>
                <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-3/5 pr-4">
                    <div className="space-y-2">
                        {currentItems.map((track, index) => {
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
                <div className="flex justify-center mt-4">
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
                </div>
            </div>
        </div>
    );
};

export default AdminAlbum;