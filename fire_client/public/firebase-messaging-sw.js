// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBEqSZdB3qTeSTyycvYDgJ5qG-5Xg9rQZY",
  authDomain: "chatkitty-example.firebaseapp.com",
  databaseURL: "https://chatkitty-example.firebaseio.com",
  projectId: "chatkitty-example",
  storageBucket: "chatkitty-example.appspot.com",
  messagingSenderId: "540634290949",
  appId: "1:540634290949:web:cd754ff7e98087230ff56c"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
