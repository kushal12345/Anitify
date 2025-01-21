import React, { createContext, useContext, useState } from 'react';
import AuthContext from './AuthContext';
import api from '../../../Services/api';

const LikeContext = createContext();

export const useLike = () => {
    return useContext(LikeContext);
}

export const LikeProvider = ({ children }) => {
    const [user, setUser ] = useState([]);
    const [liked, setLiked] = useState(false);
    const [trackliked, settrackLiked] = useState({});
    const [album, setAlbum] = useState(null);
    const [likeCounter, setLikeCounter] = useState(0);
    const [tracklikeCounter, settrackLikeCounter] = useState({});

    const { cookies } = useContext(AuthContext);

    const loggedaccess = () => {
        if (cookies.User && user && user.some(item => item._id === cookies.User._id)) {
            return true;
        }
    }

    const likerequest = async (newLiked, id, likedata) => {
        try {
            const response = await api.post(`/api/likes/${likedata}/${id}/${cookies.User ? cookies.User._id : null}`, {
                "newLiked": newLiked,
                "Authority": cookies.Authority
            });
            const result = response.data.likeCount;
            if (likedata === 'album') {
                setLikeCounter(result.users.length);
            } else if (likedata === 'track') {
                settrackLikeCounter(prevState => ({
                    ...prevState,
                    [id]: result.users.length // Update only the specific track's like count
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async (likedata, id) => {
        if (cookies.User && album.artist) {
            if (cookies.User.name === album.artist || user.some(item => item.name === cookies.User.name)) {
                if (likedata === 'album') {
                    loggedaccess() ?
                        setLiked(prevState => {
                            const newState = !prevState;
                            likerequest(newState, id, likedata);
                            return newState;
                        })
                        :
                        setLiked(false);
                } else if (likedata === 'track') {
                    loggedaccess() ?
                        settrackLiked(prevState => ({
                            ...prevState,
                            [id]: !prevState[id],
                        }))
                        :
                        settrackLiked({});

                    likerequest(!trackliked[id], id, likedata);
                }
            } else {
                likerequest(null, id, likedata);
                if (likedata === 'album') {
                    setLiked(false);
                }
            }
        } else {
            likerequest(null, id, likedata);
            if (likedata === 'album') {
                setLiked(prevState => prevState);
            }
        }
    };

    // Expose all state values and functions
    const contextValue = {
        user,
        setUser ,
        liked,
        setLiked,
        trackliked,
        settrackLiked,
        album,
        setAlbum,
        likeCounter,
        setLikeCounter,
        tracklikeCounter,
        settrackLikeCounter,
        handleLike,
    };

    return (
        <LikeContext.Provider value={contextValue}>
            {children}
        </LikeContext.Provider>
    );
}