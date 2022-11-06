import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBEqSZdB3qTeSTyycvYDgJ5qG-5Xg9rQZY",
  authDomain: "chatkitty-example.firebaseapp.com",
  databaseURL: "https://chatkitty-example.firebaseio.com",
  projectId: "chatkitty-example",
  storageBucket: "chatkitty-example.appspot.com",
  messagingSenderId: "540634290949",
  appId: "1:540634290949:web:cd754ff7e98087230ff56c"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BEz7FS1_EAqBFGJgiqZQ7RJ1WosVT5S0QTsAbNBYbFI6Oxbn2BHTND9OFNBAUPJkJ8G3fweTjaGZEL-q_N9bDMs'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
