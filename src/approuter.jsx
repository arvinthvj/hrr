import React, { Fragment, useEffect } from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './reduxStore';
import {
  getToken,
  onMessageListener,
  requestFirebaseNotificationPermission,
} from './firebaseInit.js';

import { setFcmToken } from './assets/globals/index.js';

import { useState } from 'react';

const AppRouter = () => {
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    getToken(setTokenFound)

    // onMessageListener()
    //   .then(payload => {})
    //   .catch(err => {});
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
        {/* <Notification /> */}
      </Provider>
    </Fragment>
  );
};

export default AppRouter;
