import AuthContext from "./AuthContext";
import {useCookies} from 'react-cookie';


const AuthProvider = ({children}) => {
    const [cookies,setCookies,removeCookie] = useCookies();

    const login = (data) => {
        setCookies('User',data);
    }

    const logout = (data) => {
        removeCookie('User');
    }

    return(
        <AuthContext.Provider value={{login, logout,cookies}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;