import React, { useEffect, useState } from 'react';
import { FaBackward, FaPlay, FaPause, FaForward, FaHeart, FaRandom, FaVolumeUp } from 'react-icons/fa';
import useAudio from '../Audio/useAudio';
import api from '../../Services/api';
import TrackContext from '../Hooks/Auth/TrackContext';
import { useContext } from 'react';
import { CiHeart } from "react-icons/ci";
import { useLike } from '../Hooks/Auth/LikeContext';

const Playbar = ({ playlist, initalTrackIndex = 0, currentPlayingid }) => {
    //const [toggle] = useAudio(url);
    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const handlePreviousTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const {Tracklike} = useContext(TrackContext);
    const {handleLike} = useLike();
    console.log("playlist:",playlist);
    console.log("currentPlayingid:",currentPlayingid);
    
    const [currentTrackIndex, setCurrentTrackIndex] = useState(currentPlayingid ? currentPlayingid :  initalTrackIndex);
    
    const currentTrack = playlist[currentTrackIndex];
    console.log("currentTrack:",currentTrack);

    
    const [playing, toggle] = useAudio(currentTrack?currentTrack.url:null,handleNextTrack);
    
    const [titles, setTitles] = useState(
        currentTrack ? 
            (currentTrack.title || currentTrack.track?.title || null) 
        : 
            null
    );
    const [artists,setArtists] = useState(
        currentTrack ? 
        (currentTrack.artist || currentTrack.album?.artist?.name || null) 
    : 
        null
);

    // Update titles and artists when props change
    useEffect(() => {
        setTitles(currentTrack ? 
            (currentTrack.title || currentTrack.track?.title || null) 
        : 
            null);
        setArtists(currentTrack ? 
            (currentTrack.artist || currentTrack.album?.artist?.name || null) 
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
                    const currentTrack = res.data.current[0];
                    setTitles(currentTrack.title);
                    setArtists(currentTrack.artist);
                } else {
                    console.log("No current playing data found.");
                }
            }
            } catch (error) {
                console.error('Error fetching current playing:', error);
            }
        };

        if(!titles && !artists){
            fetchCurrentPlaying();
        }
    }, [currentTrack,setTitles, setArtists,titles,artists]);

    useEffect(() => {
        console.log("Playbar updated with:", { url: currentTrack?currentTrack.url:null, title: currentTrack?currentTrack.title:null, artist: currentTrack?currentTrack.artist:null });
    }, [currentTrack]);

  

   useEffect(()=>{
        setCurrentTrackIndex(currentPlayingid);
   },[currentPlayingid]);
 

    return (
        <footer className="fixed text-white bottom-0 left-0 right-0 bg-gray-800 p-2 flex items-center">
            <div className="flex items-center">
                <img src="https://placehold.co/50x50" alt="Current song" className="rounded-full mr-4" />
                
                {/* Container for title and artist with overflow handling */}
                <div className="flex flex-col w-64 max-w-full h-100% overflow-hidden">
                    <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">{titles || "No Title"}</p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">{artists || "No Artist"}</p>
                </div>
            </div>
    
            <div className="flex-1 flex justify-center items-center">
                <FaBackward className="mx-4" onClick={handlePreviousTrack} />
                {playing ? (
                    <FaPause className="mx-4" onClick={toggle} />
                ) : (
                    <FaPlay className="mx-4 " onClick={toggle} />
                )}
                <FaForward className="mx-4" onClick={handleNextTrack} />
            </div>
            
            <div className="flex items-center">
                
                {Tracklike ? (
                    <FaHeart onClick={() => { handleLike('track', currentTrack.track._id?currentTrack.track._id:currentTrack.id); }} size={24} />
                ) : (
                    <CiHeart onClick={() => { handleLike('track', currentTrack.track._id?currentTrack.track._id:currentTrack.id); }} size={24} />
                )}

                <FaRandom className="mx-4" />
                <FaVolumeUp className="mx-4" />
            </div>
        </footer>

    );
}

export default Playbar;