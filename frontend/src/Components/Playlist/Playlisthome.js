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

const Playlisthome = ({setplaylistpage}) => {
    const [liked, setLiked] = useState(false);
    const [data,setdata] = useState();
    const {cookies} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [tracks,settracks] = useState([]);
    const [image,setimage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    
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

    useEffect(()=>{
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
    },[])



  return (
    <div className='h-[90%] overflow-hidden grid grid-rows-8 grid-flow-col gap-1'>
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
                        <h1 className="text-3xl font-bold" 
                            contentEditable 
                            suppressContentEditableWarning={true} 
                            onInput={(e)=>{setName(e.target.innerHTML)}}
                            onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                        >
                             Name Your Playlist
                        </h1>
                        <p className="text-sm text-muted-foreground">lorem ipsom</p>
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
                    <h2 className="text-5xl font-semibold tracking-tight">Let's Start Adding songs to your playlist</h2>
                    <p className="text-sm text-muted-foreground">{data?'asdasd':<Button variant='outlined' color='white'>Search music</Button>}</p>
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
                    </div>
                </div>


                <div className="h-1/5 mt-6 space-y-1">
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

export default Playlisthome