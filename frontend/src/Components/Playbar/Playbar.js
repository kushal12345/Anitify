import React, { useEffect, useState } from 'react';
import { FaBackward, FaPlay, FaPause, FaForward, FaHeart, FaRandom, FaVolumeUp } from 'react-icons/fa';
import useAudio from '../Audio/useAudio';
import api from '../../Services/api';
import TrackContext from '../Hooks/Auth/TrackContext';
import { useContext } from 'react';

const Playbar = ({ url, title, artist, id }) => {


    //url is the audio url
    //title is the title of the track
    //artist is the artist of the song
    //id is the id of the track
    const [toggle] = useAudio(url);
    const {playing, setPlaying,titles, setTitles, artists, setArtists} = useContext(TrackContext);

    //const [titles, setTitles] = useState(title || "");
    //const [artists, setArtists] = useState(artist || "");

    // Update titles and artists when props change
    useEffect(() => {
        setTitles(title);
        setArtists(artist);
    }, [title, artist,playing]);
    
    useEffect(() => {
        console.log('Title:', titles);
        console.log('Artist:', artists);
    }, [titles, artists]);

    // Update current playing track in the database if playing is true and the track has changed
    useEffect(() => {
       if(playing){
            api.post(`/api/currentplaying`, {
                playing: playing,
                title: titles,
                artist: artists,
                id: id
            });
       }
    }, [titles, artists, playing, id]);

    // Fetch current playing track from the database

    useEffect(() => {
        const fetchCurrentPlaying = async () => {
            try {
                const res = await api.get(`/api/fetchcurrentplaying/${id}`);
                if (res.data.current && res.data.current.length > 0) {
                    const currentTrack = res.data.current[0];
                    setTitles(currentTrack.title);
                    setArtists(currentTrack.artist);
                } else {
                    console.log("No current playing data found.");
                }
            } catch (error) {
                console.error('Error fetching current playing:', error);
            }
        };

        if(!titles,!artists){
            fetchCurrentPlaying();
        }
    }, [id,titles,artists]);


    // Log when the playbar is updated
 

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
                <FaBackward className="mx-4" />
                {playing ? (
                    <FaPause className="mx-4" onClick={()=>toggle()} />
                ) : (
                    <FaPlay className="mx-4 " onClick={()=>toggle()} />
                )}
                <FaForward className="mx-4" />
            </div>
            
            <div className="flex items-center">
                <FaHeart className="mx-4" />
                <FaRandom className="mx-4" />
                <FaVolumeUp className="mx-4" />
            </div>
        </footer>

    );
}

export default Playbar;