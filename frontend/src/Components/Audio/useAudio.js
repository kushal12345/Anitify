import { useState, useEffect } from 'react';
import TrackContext from '../Hooks/Auth/TrackContext';
import { useContext } from 'react';


const useAudio = (url ,onEnded) => {
    const [audio, setAudio] = useState(new Audio(url));

    const {playing, setPlaying} = useContext(TrackContext);


    const toggle = () => setPlaying(prev => !prev);

    useEffect(() => {
        const handleEnded = () => {
            setPlaying(false)
            onEnded();
        };
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.pause();
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, onEnded]);

    useEffect(() => {
        const newAudio = new Audio(url);
        setAudio(newAudio);
        audio.src = url;

        if (url && url !== undefined) {  
            setPlaying(true);
        }else{
            setPlaying(false);
    
        }

    }, [url]);

    useEffect(() => {
        if (playing && url) {            
            audio.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        } else {
            audio.pause();
        }
    }, [playing, audio]);

    return [playing, toggle];
};

export default useAudio;