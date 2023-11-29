// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken,onMessage } from 'firebase/messaging';
// import { FireBaseConfig, VapIdKey } from '../../assets/constants/config';
// import { getLoginToken, setFcmToken } from '../../assets/globals';
// import { updateNewNotificationFlag } from '../../reduxStore/appSlice';
// import { postData } from '../apicall';
// import { UpdateFcmToken } from '../apiurl';
// // import store from './store'
// import store from '../../reduxStore/store';

// initializeApp(FireBaseConfig);

// const messaging = getMessaging();

// export const requestForToken = (serviceWorkerRegistration) => {
//   return getToken(messaging, { serviceWorkerRegistration: serviceWorkerRegistration,vapidKey: VapIdKey })
//     .then((currentToken) => {
//       const loginToken = getLoginToken();

//       if (currentToken) {
//
//         //
//         let data = {
//           bearertoken:loginToken,
//           fcm_token:currentToken
//         }
//         postData(UpdateFcmToken, data, (success, res) => {
//
//
//         });

//         setFcmToken(currentToken)
//         // Perform any other neccessary action with the token
//       } else {
//         // Show permission request UI
//
//       }
//     })
//     .catch((err) => {
//       console.error('An error occurred while retrieving token. ****** ', err);
//     });
// };

// // Handle incoming messages. Called when:
// // - a message is received while the app has focus
// // - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.

// export const onMessageListener = () =>{
//   // const dispatch = useDispatch();

//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//
//         // dispatch(updateNewNotificationFlag(true))
//         store.dispatch(updateNewNotificationFlag(true))

//       resolve(payload);
//     });
//   });
// }
// //cHwc8T8m-8EQmm92bhFV8s:APA91bEZMwvirLfl7dVLlw8Wyd0aRw2C_-_vxuARDvRHs2F3sZUFwRjQrGyfw6EEy0twsCgSYuF7WtVvqNcvi9RhI9c5gY4QTWaPX1kzpoGGn3FdgtSSQHiP-tgdKfJJ328F8z1l4PlO
