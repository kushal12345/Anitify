import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Auth/AuthContext';
import api from '../../../Services/api';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Loading/Loading';


export const ProtectRoutes = ({ children }) => {
  const { cookies } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (!cookies || !cookies.token) {
      console.log("No cookies found");
      setIsLoading(false);
      return;
    }

    api.post(`/api/protected`, cookies)
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cookies, location]);

  if (isLoading) {
    return  <Loading/> 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};