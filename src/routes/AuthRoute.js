import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setRecentUrl } from '../reduxStore/appSlice';
import { redirectToLogin } from '../assets/globals';
import { store } from '../reduxStore';

function AuthRoute({ children }) {
  const userData = store?.getState()?.app?.token;
  const dispatch = useDispatch();
  const { pathname } = window.location;

  useEffect(
    () => () => {
      if (pathname) {
        dispatch(setRecentUrl(pathname));
      }
    },
    [pathname, dispatch],
  );

  if (!userData) {
    redirectToLogin();
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthRoute;
