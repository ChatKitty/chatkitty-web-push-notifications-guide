// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBZu2nOr-1g5D50lwAvksy-bQrXu-_NGas",
  authDomain: "chatkitty-push-notifications.firebaseapp.com",
  projectId: "chatkitty-push-notifications",
  storageBucket: "chatkitty-push-notifications.appspot.com",
  messagingSenderId: "1078932421843",
  appId: "1:1078932421843:web:06edd2be9c55c931816826"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title + new Date() ;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});
