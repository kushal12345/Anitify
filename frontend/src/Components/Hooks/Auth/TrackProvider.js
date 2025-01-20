import { useState,useEffect } from "react";
import TrackContext from "./TrackContext";

const TrackProvider = ({children}) => {
    const [titles, setTitles] = useState(null);
    const [artists, setArtists] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [currentTrackUrl, setCurrentTrackUrl] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentArtist, setCurrentArtist] = useState(null);
    const [currentPlayingid, setCurrentPlayingid] = useState(null);

    
    return(
        <TrackContext.Provider value={{currentPlayingid, setCurrentPlayingid,currentArtist, setCurrentArtist, currentTrackUrl, setCurrentTrackUrl,currentTitle, setCurrentTitle, playing, setPlaying,titles, setTitles, artists, setArtists}}>
            {children}
        </TrackContext.Provider>
    );
}

export default TrackProvider;