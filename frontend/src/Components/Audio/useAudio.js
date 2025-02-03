import { useEffect, useRef, useContext } from 'react';
import TrackContext from '../Hooks/Auth/TrackContext';

const useAudio = (url, onEnded) => {
    const audioRef = useRef(new Audio());
    const prevUrlRef = useRef(url);
    const { playing, setPlaying, currentTime, setCurrentTime, duration, setDuration } = useContext(TrackContext);

    const toggle = () => {
        setPlaying(prev => !prev);
    };

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            setPlaying(false);
            if (onEnded) {
                onEnded();
            }
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [onEnded]);

    useEffect(()=>{
        if(url){
            setPlaying(true);
        }
    },[url])

    useEffect(() => {
        const audio = audioRef.current;

        // Check if the URL has changed
        if (url !== prevUrlRef.current) {
            audio.pause(); // Pause the current audio
            audio.src = url; // Set the new audio source
            audio.load(); // Load the new audio source
            prevUrlRef.current = url; // Update the previous URL
        }

        // Play or pause based on the playing state
        if (playing) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Audio is playing");
                }).catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
        } else {
            audio.pause(); // Pause if not playing
        }

    }, [url, playing]);

    return [playing, toggle, currentTime, duration];
};

export default useAudio;