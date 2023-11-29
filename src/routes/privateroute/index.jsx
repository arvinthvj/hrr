import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { store } from '../../reduxStore';

const GuestLayout = ({ children, ...rest }) => {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
};

function PrivateRoute({ children }) {
  const token = store?.getState()?.app?.token;

  if (!token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
}

export default PrivateRoute;
