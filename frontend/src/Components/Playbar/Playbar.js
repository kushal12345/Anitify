import React, { useEffect, useState } from 'react';
import { FaBackward, FaPlay, FaPause, FaForward, FaHeart, FaRandom, FaVolumeUp } from 'react-icons/fa';
import useAudio from '../Audio/useAudio';
import api from '../../Services/api';
import TrackContext from '../Hooks/Auth/TrackContext';
import { useContext } from 'react';
import { CiHeart } from "react-icons/ci";
import { useLike } from '../Hooks/Auth/LikeContext';
import { RiPlayListFill } from "react-icons/ri";
import { baseURL } from '../../Services/config';

const Playbar = ({ playlist, initalTrackIndex = 0, currentPlayingid }) => {

    const [playlistdisplay, setPlaylistDisplay] = useState(false);
    //const [toggle] = useAudio(url);
    
    console.log(playlist);
   

    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const handlePreviousTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const {Tracklike} = useContext(TrackContext);
    const {handleLike} = useLike();
    
    
    const [currentTrackIndex, setCurrentTrackIndex] = useState(currentPlayingid ? currentPlayingid :  initalTrackIndex);
    
    const currentTrack = playlist[currentTrackIndex];
    
    const [playing, toggle, currentTime, duration] = useAudio(currentTrack?currentTrack.url:null,handleNextTrack);
    
    const [titles, setTitles] = useState(
        currentTrack ? 
            (currentTrack.title || currentTrack.track?.title || null) 
        : 
            null
    );
    const [artists,setArtists] = useState(
        currentTrack ? 
        (currentTrack.artist ? 
            (
                currentTrack.artist
            ) 
        : 
           (
            currentTrack.album.artist ? 
                (
                    currentTrack.album.artist
                )
                :
                (
                    currentTrack.album.artist.name
                )
           )
        ) 
    : 
        null
);

    // Update titles and artists when props change
    useEffect(() => {
        setTitles( currentTrack ? 
            (currentTrack.title || currentTrack.track?.title || null) 
            : 
            null);
            
        setArtists(currentTrack ? 
            //        (currentTrack.artist || currentTrack.album?.artist?.name || null)
                    (currentTrack.artist ? 
                        (
                            currentTrack.artist
                        ) 
                    : 
                       (
                        currentTrack.album.artist ? 
                            (
                                currentTrack.album.artist
                            )
                            :
                            (
                                currentTrack.album.artist.name
                            )
                       )
                    ) 
                : 
                    null);
    }, [currentTrack]);
    
    

    // Update current playing track in the database if playing is true and the track has changed
    useEffect(() => {
       if(playing && currentTrack){
            api.post(`/api/currentplaying`, {
                playing: playing,
                title: titles,
                artist: artists,
                id: currentTrack._id
            }).catch(error => {
                console.error('Error updating current playing:', error);
            });
       }
    }, [titles, artists, playing, currentTrack]);

    // Fetch current playing track from the database

    useEffect(() => {
        const fetchCurrentPlaying = async () => {
            try {
                if(currentTrack){
                const res = await api.get(`/api/fetchcurrentplaying/${currentTrack._id}`);
                if (res.data.current && res.data.current.length > 0) {
                    const currentTrackr = res.data.current[0];
                    console.log(currentTrackr);

                    setTitles(currentTrackr.title);
                    setArtists(currentTrackr.artist);

                } else {
                    console.log("No current playing data found.");
                }
            }
            } catch (error) {
                console.error('Error fetching current playing:', error);
            }
        };

        
            fetchCurrentPlaying();
        
    }, [currentTrack,setTitles, setArtists,titles,artists]);

    useEffect(() => {
        console.log("Playbar updated with:", { url: currentTrack?currentTrack.url:null, title: titles, artist: artists });
    }, [currentTrack,titles,artists]);

  

   useEffect(()=>{
        setCurrentTrackIndex(currentPlayingid);
   },[currentPlayingid]);
 
   const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


    return (
        <footer className="fixed text-white bottom-0 left-0 right-0 bg-gray-800 p-2 flex items-center">
            <div className="flex items-center ">
            <div className='w-12 h-12 overflow-hidden rounded-full mr-4'>
                <img 
                    src={currentTrack ? `${baseURL}/${artists}/${currentTrack.album.title}/${currentTrack.album.image}` : "https://placehold.co/50x50"}
                    alt="Current song" 
                    className="w-full h-full object-cover" 
                />
            </div>
            

                
                
                
                {/* Container for title and artist with overflow handling */}
                <div className="flex flex-col w-64 max-w-full h-100% overflow-hidden">
                    <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">{titles || "No Title"}</p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">{artists || "No Artist"}</p>
                </div>
            </div>
            <div className="flex-1  h-full  grid grid-rows-2 justify-center items-center">
                
                <div className='w-full my-1 flex items-center'>
                <div className='bg-white h-1 w-96 mx-2'>
                <div className='bg-blue-500 h-1' style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <p className='text-white text-sm'>{formatTime(currentTime)} / {formatTime(duration)}</p>
                </div>

                <div className='w-full my-1 flex justify-center items-center'>
                    <FaBackward className="mx-4" onClick={handlePreviousTrack} />
                    {playing ? (
                        <FaPause className="mx-4" onClick={toggle} />
                    ) : (
                        <FaPlay className="mx-4 " onClick={toggle} />
                    )}
                    <FaForward className="mx-4" onClick={handleNextTrack} />
                </div>
            </div>
            
            <div className="flex items-center">
                
                {Tracklike ? (
                    <FaHeart onClick={() => { handleLike('track', currentTrack.track._id?currentTrack.track._id:currentTrack.id); }} size={24} />
                ) : (
                    <CiHeart onClick={() => { handleLike('track', currentTrack.track._id?currentTrack.track._id:currentTrack.id); }} size={24} />
                )}

                <FaRandom className="mx-4" />
                <div className="relative flex items-center group">
                    <FaVolumeUp className="mx-4" />
                    <div className="bg-white absolute right-4 bottom-6 h-24 w-1 mx-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                
            </div>
            
            <div className='flex px-3 items-center'>
                
                <RiPlayListFill size={24} className='relative ' onClick={()=>setPlaylistDisplay(!playlistdisplay)} />

                <div className={`bg-white bg-opacity-20 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-lg h-64 w-64 absolute bottom-16 right-0 mx-2 ${playlistdisplay ? 'visible' : 'invisible'}`}>
                    <p className='text-white w-full bg-opacity-15 bg-white p-1 rounded-lg text-md flex justify-center'>Current Playlist</p>
                    {playlist.map((track, index) => (
                        <div key={track._id} className='flex items-center justify-between my-2'>
                            <p className='text-white mx-2'>{index+1}</p>
                            <p className='text-white text-sm'>{track.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </footer>

    );
}

export default Playbar;