import { useState,useEffect } from "react";
import AuthContext from "./AuthContext";
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const AuthProvider = ({children}) => {
    const [cookies,setCookies,removeCookie] = useCookies();
    const [sidebarOpen,setSidebarOpen] = useState(false)
    const navigate = useNavigate();

    const [isAuthenticat, setIsAuthenticate] = useState(()=>{
        let datafetch = localStorage.getItem('Token');
        return datafetch ? true : false;
    })

    const login = (data) => {
        localStorage.setItem('User', JSON.stringify(data.user));
        localStorage.setItem('Token', data.token);
        const user = JSON.parse(localStorage.getItem('User'));
        (data.user)? setCookies('User', user) : removeCookie('User')
    }

    const logout = () => {
        removeCookie('User');
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
        setIsAuthenticate(false);
        navigate('/');
    }
  
    return(
        <AuthContext.Provider value={{isAuthenticat, login, logout,cookies,sidebarOpen,setSidebarOpen}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;