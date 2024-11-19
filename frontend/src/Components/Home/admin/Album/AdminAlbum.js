import React, { useEffect, useState, useContext } from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { baseURL } from '../../../../Services/config';
import AuthContext from '../../../Hooks/Auth/AuthContext';
import api from '../../../../Services/api';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import FetchUser  from '../../../Functions/Fetchuser';
import debounce from '../../../../Middleware/debounce';
import { useCallback } from 'react';
import usePagination from '../../../Pagination/Pagination';
import { MdFormatListBulletedAdd } from "react-icons/md";
import Loading from '../../../Loading/Loading';


const AdminAlbum = ({ setsecondPage, show }) => {
    const { cookies } = useContext(AuthContext);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState(show ? show : null);
    const [liked, setLiked] = useState(false);
    const [trackliked, settrackLiked] = useState({});
    const [tracklikeCounter, settrackLikeCounter] = useState({}); 
    const [likeCounter, setLikeCounter] = useState(0); 
    const [loading, setloading] = useState(false);
    const [user, setUser ] = useState([]);

    // Pagination
    const itemsPerPage = 10;
    const { currentItems, totalPages, currentPage, handlePageChange } = usePagination(tracks, itemsPerPage);

    const loggedaccess = () => {
        return cookies.User && albums.artist && 
               (cookies.User.name === albums.artist || user.some(item => item.name === cookies.User.name));
    }

    const likerequest = async (newLiked, id, likedata) => {
            try {
                const response = await api.post(`/api/likes/${likedata}/${id}/${cookies.User ? cookies.User._id : null}`, {
                    "newLiked": newLiked,
                    "Authority": cookies.Authority
                });
                const result = response.data.likeCount;
                if (likedata === 'album') {
                    setLikeCounter(result.users.length);
                } else if (likedata === 'track') {
                    settrackLikeCounter(prevState => ({
                        ...prevState,
                        [id]: result.users.length // Update only the specific track's like count
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        };

    useEffect(() => {
        FetchUser ("all", setUser );
    }, [setUser ]);

    const handleLike = async(likedata, id) => {
        if (cookies.User && albums.artist) {
            if (cookies.User.name === albums.artist || user.some(item => item.name === cookies.User.name)) {
                if (likedata === 'album' && loggedaccess()) {
                    setLiked(prevState => {
                        const newState = !prevState;
                        likerequest(newState, id, likedata);
                        return newState;
                    });
                } else if (likedata === 'track' && !loggedaccess()) {
                    settrackLiked(prevState => ({
                        ...prevState,
                        [id]: !prevState[id],
                         // Toggle the liked state for this specific track ID
                    }));
                    likerequest(!trackliked[id], id, likedata);// Pass the new liked state for the track
                }
            } else {
                likerequest(null, id, likedata);
                if (likedata === 'album') {
                    setLiked(false);
                }
            }
        } else {
            likerequest(null, id, likedata);
            if (likedata === 'album') {
                setLiked(prevState => prevState);
            }
        }
    };

   


    const handleLikeClick = (likedata, id) => {
        handleLike(likedata, id);
    };

    // Fetch tracks based on user and albums
    useEffect(() => {
        const fetchTracks = debounce(async () => {
            if (albums) {
                try {
                    const response = await api.get(`/api/tracks/${albums._id}`);
                    const tracks = response.data;
                    setTracks(tracks.result || []);
                } catch (error) {
                    console.log('Error fetching album:', error);
                }
            }
        });
        fetchTracks();
    }, [albums]);

    // Fetch likes
    useEffect(() => {
        const fetchLike = debounce(async (param, data) => {
            if (data) {
                try {
                    const response = await api.get(`/api/likestatus/${param}/${data._id}/${cookies.User ? cookies.User._id : null}`);
                    const likes = response.data.result;
                    
                    if (likes && likes.length > 0) {
                        const newTrackLiked = {};
                        const newTrackCounter = {};
                        for (const like of likes) {
                            newTrackLiked[like.track && like.track._id] = like.likestate; // Collect liked states
                            newTrackCounter[like.track && like.track._id] = like.users.length;
                        }
                            
                            if (param === 'album') {
                            setLiked(loggedaccess() ? likes[0].likestate: false);
                            setLikeCounter(likes[0].users.length);
                        } else if (param === 'track') {
                            loggedaccess()?
                                settrackLiked(prevState => ({
                                    ...prevState,
                                    ...newTrackLiked // Update state with new liked states
                                })):
                                settrackLiked({});
                            settrackLikeCounter(prevState => ({
                                ...prevState,
                                ...newTrackCounter //update state with new like track users array to find length as a counter
                            }))

                        }
                    } else {
                        // Handle case where likes array is empty
                        if (param === 'album' && !loggedaccess()) {
                            setLiked(false);
                            setLikeCounter(0);
                        } else if (param === 'track' && !loggedaccess()) {
                            settrackLiked({});
                            settrackLikeCounter({});
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });

        // Fetch likes for albums
        fetchLike('album',albums);
         // Fetch likes for tracks

        // Fetch likes for tracks
        const fetchLikesForTracks = async () => {
            await Promise.all(tracks.map(track => fetchLike('track', track)));
        };

        fetchLikesForTracks();
        }, [albums, tracks, setLikeCounter, setLiked,tracklikeCounter,trackliked, settrackLiked, settrackLikeCounter]);

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
                        src={albums.image?`${baseURL}/${albums.artist}/${albums.title}/${albums.image}`:'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'}
                        style={{ height: '15%', width: '15%' }}
                    />

                    <div>
                        <h1 className="text-3xl font-bold">{albums?.title || 'Unknown Album'}</h1>
                        <p className="text-sm text-muted-foreground">{albums.artist || 'Unknown Artist'}  • 2023 • 12 songs, 48 min</p>
                        <div className='mt-5 w-auto flex items-center ' >
                           {/* CI heart is empty heart and Faheart is liked one */}
                           {  liked? <FaHeart onClick={()=>{handleLikeClick('album',albums._id)}} size={24} /> : <CiHeart onClick={()=>{handleLikeClick('album',albums._id)}} size={24} /> }
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

                                    {/* Like Track Button */}
                                    <div className='flex-1 flex items-center'>
                                    {trackliked[track._id] ? (
                                            <FaHeart onClick={() => { handleLikeClick('track', track._id); }} size={24} />
                                        ) : (
                                            <CiHeart onClick={() => { handleLikeClick('track', track._id); }} size={24} />
                                        )}                                        
                                        <p className='mx-4'>{tracklikeCounter && tracklikeCounter[track._id] !== undefined ? tracklikeCounter[track._id] : 0} Likes</p>
                                        </div>
                                     {/* ADD to Playlist Button */}
                                    <div className='  flex items-center'>
                                        <MdFormatListBulletedAdd size={24}/>
                                        <p className='mx-4'> Add to Playlist</p>
                                    </div>

                                    <div className="text-sm text-muted-foreground">{`${hours}:${minutes.toString().padStart(2, '0')}`}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Pagination Button*/}
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