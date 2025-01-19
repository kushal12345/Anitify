import { useState, useEffect } from 'react';

const useAudio = (url) => {
    const [audio, setAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        setPlaying(prev => !prev);
    };

    useEffect(() => {
        const handleEnded = () => setPlaying(false);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.pause();
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio]);

    useEffect(() => {
        if (url && url !== undefined) {
            const newAudio = new Audio(url);
            setAudio(newAudio);
            audio.src = url;
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