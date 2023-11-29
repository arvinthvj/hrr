import firebase from 'firebase/app';
import 'firebase/messaging';
import { VapIdKey } from './assets/constants/config';
import { store } from './reduxStore';
import { setFcmToken, updateNewNotificationFlag } from './reduxStore/appSlice';
import { postData } from './services/apicall';
import { UpdateFcmToken, getFirebaseCredential } from './services/apiurl';
import { getDataWithToken } from './services/apiservice';

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async setTokenFound => {
  try {
    const result = await getDataWithToken(getFirebaseCredential);

    try {
      if (firebase.messaging.isSupported()) {
        firebase.initializeApp(result);
        const messaging = firebase.messaging();
        let currentToken = '';
        Notification.requestPermission().then(async permission => {});

        currentToken = await messaging.getToken({
          vapidKey: VapIdKey,
        });
        const loginToken = store?.getState()?.app?.token;
        const updateToken = store?.getState()?.app?.fcmToken;
        if (currentToken && loginToken && !updateToken) {
          let data = {
            fcm_token: currentToken,
          };
          postData(UpdateFcmToken, data, (success, res) => {});
          setTokenFound(true);
          store?.dispatch(setFcmToken(currentToken));
        } else {
          setTokenFound(false);
        }
        messaging.onMessage(payload => {
          store.dispatch(updateNewNotificationFlag(true));
        });

        messaging.onBackgroundMessage(function (payload) {
          const notificationTitle = payload.notification.title;
          const notificationOptions = {
            body: payload.notification.body,
            icon: '/logo192.png',
          };

          // Show a notification when a background message is received
          return self.registration.showNotification(notificationTitle, notificationOptions);
        });
      }
    } catch (err) {}
  } catch (error) {}

  return currentToken;
};

export const onMessageListener = () =>
  new Promise(resolve => {
    messaging.onMessage(payload => {
      store.dispatch(updateNewNotificationFlag(true));
      resolve(payload);
    });
  });
