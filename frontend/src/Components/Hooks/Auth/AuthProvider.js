import { useState } from "react";
import AuthContext from "./AuthContext";
import {useCookies} from 'react-cookie';


const AuthProvider = ({children}) => {
    const [cookies,setCookies,removeCookie] = useCookies();
    const [sidebarOpen,setSidebarOpen] = useState(true)
    const login = (data) => {
        setCookies('User',data,{ maxAge: 0 });
    }

    const logout = () => {
        removeCookie('User');
    }


  
    return(
        <AuthContext.Provider value={{login, logout,cookies,sidebarOpen,setSidebarOpen}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;