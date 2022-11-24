import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBZu2nOr-1g5D50lwAvksy-bQrXu-_NGas",
  authDomain: "chatkitty-push-notifications.firebaseapp.com",
  projectId: "chatkitty-push-notifications",
  storageBucket: "chatkitty-push-notifications.appspot.com",
  messagingSenderId: "1078932421843",
  appId: "1:1078932421843:web:06edd2be9c55c931816826"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound, onTokenFound, onPermissionRequired, onError) => {
  return getToken(messaging, {vapidKey: 'BIEv3aFfgaiwcMd4mOyOtcsVefRTIuQZW1vPdBrWK3oyyj_85Ea9N_BpQHMI1TaFK06u60vwPj9HYOuw6UZh3Tc'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
      onTokenFound(currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required
      onPermissionRequired();
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
    onError(err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
