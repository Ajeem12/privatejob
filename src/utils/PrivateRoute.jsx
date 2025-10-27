import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ allowedRole }) => {
  const { jobSeeker, employer, authLoading } = useContext(AuthContext);
  const location = useLocation();

  if (authLoading) return null; 


  const currentUser = allowedRole === '1' ? employer : jobSeeker;

  if (!currentUser) {
   
    const loginPath = allowedRole === '1' ? '/employer/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    const redirectTo = currentUser.role === '1' ? '/employer' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

 
  return <Outlet />;
};

export default PrivateRoute;
