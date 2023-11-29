import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { companySettingsUrl } from '../../assets/constants/pageurl';

const GuestLayout = ({ children, ...rest }) => {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
};
const PublicRoute = ({ component: Component, ...rest }) => {
  const token = store?.getState()?.app?.token;
  //
  return (
    <>
      <div className={`main-wrapper ${!token ? 'login-body' : ''}`}>
        <Route element={<GuestLayout />}>
          <Route
            {...rest}
            render={props =>
              token ? (
                <Navigate to={companySettingsUrl} />
              ) : (
                <Component {...props} />
              )
            }
          />
        </Route>
      </div>
    </>
  );
};

export default PublicRoute;
