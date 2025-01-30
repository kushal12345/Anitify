import { useState, useEffect, useRef } from 'react';

const useAudio = (url, onEnded) => {
    const audioRef = useRef(new Audio());
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const isPlayingRef = useRef(false); // Ref to track if audio is currently playing
    const prevUrlRef = useRef(audioRef.current);
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

    useEffect(() => {
        const audio = audioRef.current;

        if (url) {
            // Stop any currently playing audio

            audio.src = url;
            audio.load(); // Load the new audio source

            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Audio is playing");
                    setPlaying(true); // Set playing to true only after it starts
                    isPlayingRef.current = true; // Update the ref to indicate playing
                    if ( url !== prevUrlRef.current.src  && playing) {
                            audio.pause();
                            setPlaying(false); // Ensure we stop the previous audio    
                    }
        
                }).catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
        }
    }, [url]);

    useEffect(() => {
        const audio = audioRef.current;

        if (playing) {
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Audio is playing");
                    isPlayingRef.current = true; // Update the ref to indicate playing
                    if ( url !== prevUrlRef.current.src && playing ) {
                            audio.pause();
                            setPlaying(false); // Ensure we stop the previous audio                    
                    } 
            
                }).catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
        }
    }, [playing]);

    return [playing, toggle, currentTime, duration];
};

export default useAudio;