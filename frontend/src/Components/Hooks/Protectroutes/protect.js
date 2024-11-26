import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Auth/AuthContext';
import api from '../../../Services/api';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Loading/Loading';

export const ProtectRoutes = ({ children }) => {
  const { cookies, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let location = useLocation();
  const inactivityTimeLimit = 300000; // 5 minutes (300,000 ms)

  useEffect(() => {
    //console.log(cookies.User);
    if (!cookies.User) {
      //console.log("No cookies found");
      setIsLoading(false);
      return;
    }

    // Check authentication
    api.post(`/api/protected`, { token: localStorage.getItem('Token'), user: cookies.User })
      .then((res) => {
        //console.log(res.data.success);
        if (res.data.success === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          logout();
        }
      })
      .catch((error) => {
        //console.log(error);
        setIsAuthenticated(false);
        logout();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cookies, location, logout]);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        logout(); // Call the logout function
      }, inactivityTimeLimit);
    };

    // Event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Initialize the timer on mount
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [logout]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};