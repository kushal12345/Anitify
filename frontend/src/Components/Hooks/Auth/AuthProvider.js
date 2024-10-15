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
        console.log(data);
        localStorage.setItem('User', JSON.stringify(data.user));
        localStorage.setItem('Authority', JSON.stringify(data.authority));
        localStorage.setItem('Token', data.token);
        const user = JSON.parse(localStorage.getItem('User'));
        const auth = JSON.parse(localStorage.getItem('Authority'));
        (data.user)? setCookies('User', user) : removeCookie('User');
        (data.authority)? setCookies('Authority', auth) : removeCookie('Authority');
    }

    const logout = () => {
        removeCookie('User');
        removeCookie('Authority');
        localStorage.removeItem('User');
        localStorage.removeItem('Authority');
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