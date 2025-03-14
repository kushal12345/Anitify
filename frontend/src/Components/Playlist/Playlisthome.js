import React,{useState, useEffect} from 'react';
import { baseURL } from '../../Services/config';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Button } from '@mui/material';
import api from '../../Services/api';
import { useContext } from 'react';
import AuthContext from '../Hooks/Auth/AuthContext';
import { FaEdit } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoList } from "react-icons/io5";
import { useLike } from '../Hooks/Auth/LikeContext';
import TrackContext from '../Hooks/Auth/TrackContext';


const Playlisthome = ({setplaylistpage, fdata}) => {
    const [liked, setLiked] = useState(false);
    const fetchdata = fdata?fdata:null;
    const [data,setdata] = useState();
    const {cookies} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [tracks,settracks] = useState([]);
    const [image,setimage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [albums,setAlbums] = useState([]);

    const {setTracklike,setCurrentTrackUrl, setCurrentTitle, setCurrentArtist, setCurrentPlayingid,setPlaylist } = useContext(TrackContext);
    const {user,
        setUser ,
        //liked,
        //setLiked,
        trackliked,
        settrackLiked,
        album,
        setAlbum,
        likeCounter,
        setLikeCounter,
        tracklikeCounter,
        settrackLikeCounter,
        handleLike,
        likerequest} = useLike();
    
    const [pagedata,setpagedata] = useState({
        playlistname:"Name Your Playlist"
        });

        useEffect(() => {
            if (fetchdata === "liked") {
                setpagedata({
                    playlistname: "Liked Songs"
                });
        
                const fetchLikedTracks = async () => {
                    try {
                        const resp = await api.get(`/api/playlist/${cookies.User ? cookies.User._id : null}/${fetchdata}`);
                        if (resp && resp.data.success) {
                            settracks(resp.data.results); // Assuming you want to set the liked tracks to state
                        } else {
                            console.log("Error fetching liked tracks:", resp.data.msg);
                        }
                    } catch (error) {
                        console.log("Error:", error);
                    }
                };
        
                fetchLikedTracks();
            }
        }, [fetchdata, cookies.User,setpagedata]);
    

    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage(reader.result); // Update the image state with the new image
            };
            reader.readAsDataURL(file); // Convert the file to a base64 URL
        }
    };

    {/*useEffect(()=>{
        const formData = new FormData();
        formData.append('name',name);
        for (let i = 0; i < tracks.length; i++){
            formData.append('tracks', tracks[i]);
        }
        formData.append('image',image);
        formData.append('createdBy',cookies.User.name);
        formData.append('creatorType',cookies.Authority);
        // uploaad playlist details
        try {
           api.post(`/api/playlist/${cookies.User._id}`,formData)
           .then((response) => {
                //console.log(response);
            })
            .catch((error)=>{
                //console.log(error);
            })
            .finally(()=>{

            })
        } catch (error) {
            //console.log(error);
        }
    },[])*/}

        const fetchAlbums = async (id) => {
            if(id){
                const response = await api.get(`/api/albums/tracks/${id}`);
                console.log(response.data.result);
                const result = response.data.result;
                return result;
            }
            
            
        };
        
       
        const setplaylist = async () => {
            if (tracks && tracks.length > 0) {
                // Create an array of promises to fetch album data for each track
                const newPlaylist = await Promise.all(tracks.map(async (track) => {
                    const albumData = await fetchAlbums(track._id); // Fetch album data for the track
                    
                    return {
                        ...track,
                        album: albumData[0], // Set the fetched album data
                        url: `${baseURL}/${encodeURIComponent(albumData[0].artist.name)}/${encodeURIComponent(albumData[0].title)}/${encodeURIComponent(track.track.title)}`
                    };
                }));
                setPlaylist(newPlaylist);
            }

            
        
        };
  return (
    <div className='overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-4 h-auto mb-2 overflow-hidden grid grid-rows-8 grid-flow-col gap-1'>
            <div className='w-full overflow-hidden p-2 row-span-3 bg-white bg-opacity-25 text-white rounded-xl'>
                <div className='w-full mb-2 hover:cursor-pointer' onClick={() => { setplaylistpage(false) }} >
                    <FaArrowLeft />
                </div>
                <div className="flex items-center gap-4">
                    <div 
                        style={{ position: 'relative', display: 'inline-block' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className=' w-[15%] aspect-square overflow-hidden'
                    >
                        <img
                            alt="Album cover"
                            className={`aspect-square  rounded-md object-cover transition-opacity duration-300 ${isHovered ? 'opacity-50' : 'opacity-100'}`}
                            src={data ? `${baseURL}/${data}/profile/${data}` : require('../../Images/playlistmusic2.png')} 
                        />
                        {isHovered && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <FaEdit style={{ color: 'white', fontSize: '24px' }} 
                                    onClick={() => document.getElementById('fileInput').click()} // Trigger file input click
                        />
                            </div>
                        )}
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display: 'none' }} // Hide the file input
                            accept="image/*" // Only allow image files
                            onChange={handleImageChange} 
                            />
                    </div>

                    <div>
                    <p className="text-[] text-muted-foreground my-1">Playlist</p>
                        <h1 className="text-4xl font-bold" 
                            contentEditable={fetchdata ? "false" : "true"}  
                            suppressContentEditableWarning={true} 
                            onInput={(e)=>{setName(e.target.innerHTML)}}
                            onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                        >
                             {pagedata.playlistname}
                        </h1>
                        <div className='mt-5 w-auto flex items-center ' >
                           {/* CI heart is empty heart and Faheart is liked one */}
                           {  liked? <FaHeart onClick={()=>{}} size={24} /> : <CiHeart onClick={()=>{}} size={24} /> }
                            <p className='mx-4'>5 Likes</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='w-full h-auto row-span-5 px-2 mb-9 pb-3'>
                <div className="h-1/5 mt-6 space-y-1">
                    <h2 className="text-5xl font-semibold tracking-tight">{fetchdata?
                            <div className='w-full my-2 flex '>
                                <div className='w-1/2 flex'>
                                    <div className='mx-2'>
                                        <FaPlayCircle/>
                                    </div>
                                    <div className='mx-2'>
                                        <FaShuffle/>                                
                                    </div>
                                </div>
                                <div className='w-1/2 flex justify-end '>
                                    <p className='text-sm flex items-center mx-2 font-normal'>Date added</p>
                                    <div>
                                        <IoList/>
                                    </div>
                                </div>
                            </div>
                        :
                            "Let's Start Adding songs to your playlist"
                        }
                        </h2>
                    <p className="text-sm text-muted-foreground">{data?'asdasd':<Button variant='outlined' color='white'>Search music</Button>}</p>
                </div>
                <div className=" overflow-y-scroll h-80 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-auto pr-4">
                    {
                        tracks.map((track, index) => {
                            return(
                                <div className="space-y-2 "  onClick={
                                    () => {
                                        setplaylist();
                                        setCurrentPlayingid(index);
                                    }
                                  
                                } key={index}>
                                    <div  className="flex items-center gap-4  cursor-pointer">
                                        <span className="text-sm font-medium text-muted-foreground w-4"> {index + 1}</span>
                                        <div className="h-10 flex items-center w-10">
                                            <RxAvatar alt="Song cover" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading -none">{track.track.title}</p>
                                        </div>
                                        <div className="text-sm text-muted-foreground">time of song</div>
                                    </div>
                                </div>

                            );
                        }) 
                    }
                </div>


                <div className=" mb-3 h-1/5 mt-6 space-y-1">
                    <h2 className="text-5xl  font-semibold tracking-tight">Recommended Songs</h2>
                    <p className="text-sm text-muted-foreground">let's start choosing your favourite music.</p>
                </div>
                <div className=" overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-auto pr-4">
                    <div className="space-y-2">
                                <div  className="flex items-center gap-4 cursor-pointer">
                                    <span className="text-sm font-medium text-muted-foreground w-4"> 1</span>
                                    <div className="h-10 flex items-center w-10">
                                        <RxAvatar alt="Song cover" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading -none">track title</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">time of song</div>
                                </div>
                                <p className="text-sm w-full flex justify-center text-muted-foreground"><Button variant='outlined' color='white'>View  More</Button></p>
                    </div>
                </div>

                
                <div className="flex justify-center mt-4">
                    {/*Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {index + 1}
                        </button>
                    ))*/}
                </div>
            </div>
        </div>
  )
}

export default Playlisthome;