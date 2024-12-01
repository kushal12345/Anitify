import React, { useEffect, useState, useContext } from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { baseURL } from '../../Services/config';
import AuthContext from '../Hooks/Auth/AuthContext';
import api from '../../Services/api';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import FetchUser  from '../Functions/Fetchuser';
import usePagination from '../Pagination/Pagination';
import { MdFormatListBulletedAdd } from "react-icons/md";
import Button from '@mui/material/Button';
import fetchAlbums from '../Functions/Fetchalbums';
import fetchLike from '../Functions/Fetchlike';

const Artistpage = ({ setsecondPage, show }) => {
    const data = show ? show : null;
    const [albumpara1, setalbumpara1] = useState(null);
    const [albumpara2, setalbumpara2] = useState(null);
    const { cookies } = useContext(AuthContext);
    const [likedAlbums, setLikedAlbums] = useState({});
    const [likeCounters, setLikeCounters] = useState({});
    const [user, setUser ] = useState([]);
    const [loading, setloading] = useState(false);

    // Pagination
    const itemsPerPage = 10;
    const { currentItems, totalPages, currentPage, handlePageChange } = usePagination(albumpara2 ? albumpara2 : [], itemsPerPage);

    const loggedaccess = () => {
        return cookies.User && user.some(item => item._id === cookies.User._id);
    };

    useEffect(() => {
        setloading(true);
        FetchUser ("all", setUser ).finally(() => setloading(false));
    }, [setUser ]);

    useEffect(() => {
        fetchAlbums(data._id, setalbumpara1, setalbumpara2);
    }, [data]);

    useEffect(() => {
        const fetchLikesForAlbums = async () => {
            if (albumpara2) {
                for (const album of albumpara2) {
                    try {
                        const likes = await fetchLike('album', album, cookies.User ? cookies.User._id : null);
                        if (likes && likes.length > 0) {
                            const userLikedTracks = likes.some(like => like.users.includes(cookies.User ? cookies.User._id : null));
                            setLikedAlbums(prev => ({
                                ...prev,
                                [album._id]: userLikedTracks ? likes[0].likestate : false
                            }));
                            setLikeCounters(prev => ({
                                ...prev,
                                [album._id]: likes[0].users.length
                            }));
                        } else {
                            setLikedAlbums(prev => ({
                                ...prev,
                                [album._id]: false
                            }));
                            setLikeCounters(prev => ({
                                ...prev,
                                [album._id]: 0
                            }));
                        }
                    } catch (error) {
                        console.error(`Error fetching like for album`, error);
                    }
                }
            }
        };

        fetchLikesForAlbums();
    }, [albumpara2, cookies.User]);

    const convertDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    };

    if (loading) {
        return <div>Loading...</div>; // Add your loading component here
    }

    return (
        <div className='h-[90%] overflow-hidden grid ```javascript
        grid-rows-8 grid-flow-col gap-1'>
            <div className='w-full overflow-hidden p-2 row-span-3 bg-white bg-opacity-25 text-white rounded-xl'>
                <div className='w-full mb-2 hover:cursor-pointer' onClick={() => { setsecondPage(false) }}>
                    <FaArrowLeft />
                </div>
                <div className="flex items-center gap-4">
                    <img
                        alt="Artist cover"
                        className="aspect-square rounded-md object-cover"
                        src={data.image ? `${baseURL}/${data.name}/profile/${data.image}` : 'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'}
                        style={{ height: '15%', width: '15%' }}
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{data ? data.name : 'Unknown Artist'}</h1>
                        <p className="text-sm my-2 text-muted-foreground">Bio: {data ? data.bio : "bio still empty"}</p>
                        <p className="text-sm my-2 text-muted-foreground">Total Albums: {data ? data.albums.length : "0"} albums</p>
                        <p className="text-sm my-2 text-muted-foreground">Region: {data ? data.country : " "}</p>
                        <div className='mt-5 w-auto flex items-center'>
                            <Button variant="contained" color='success'>Follow</Button>
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
                        {currentItems && currentItems.map((album, index) => {
                            const { hours, minutes, seconds } = convertDuration(album.duration || 0);
                            return (
                                <div key={index} className="flex items-center gap-4 cursor-pointer">
                                    <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                                    <div className="h-10 flex items-center w-10">
                                        <img
                                            alt="Album cover"
                                            className="aspect-square object-cover"
                                            src={album.image ? `${baseURL}/${album.artist}/${album.title}/${album.image}` : 'https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png'}
                                            style={{ height: '80%', width: '80%' }}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{album.title}</p>
                                    </div>

                                    <div className='flex-1 flex items-center'>
                                        {likedAlbums[album._id] ? (
                                            <FaHeart size={24} />
                                        ) : (
                                            <CiHeart size={24} />
                                        )}
                                        <p className='mx-4'>{likeCounters[album._id] || 0} Likes</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <MdFormatListBulletedAdd size={24} />
                                        <p className='mx-4'> Add to Library</p>
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

export default Artistpage;