import { useState,useEffect } from "react";
import TrackContext from "./TrackContext";

const TrackProvider = ({children}) => {
    const [titles, setTitles] = useState(null);
    const [artists, setArtists] = useState(null);
    const [playing, setPlaying] = useState(false);
    
    return(
        <TrackContext.Provider value={{ playing, setPlaying,titles, setTitles, artists, setArtists}}>
            {children}
        </TrackContext.Provider>
    );
}

export default TrackProvider;