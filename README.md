# Setting Up Web Push Notifications

This is an example [React](https://github.com/facebook/create-react-app) app that uses [ChatKitty](https://chatkitty.com/docs) and [Firebase](https://firebase.google.com/) to enable web push notifications. 

## Getting Started

ℹ️  You will need a ChatKitty account to set up the User Received Notification chat function and retrieve your ChatKitty credentials from the [ChatKitty dashboard](https://dashboard.chatkitty.com/). You will also use the ChatKitty Dashboard to add Firebase as a chat runtime dependency. Next, you also need a Firebase account to create a [Firebase project](https://console.firebase.google.com/) as we wil be using Firebase as our push notification provider. 

Then, install all dependencies using the following command:

`yarn install`

## Change Credentials
You will need to replace certain credentials in the code with your own credentials. These will be obtained either from the ChatKitty Dashboard or yor Firebase project. 

First, inside `firebase.js` replace `firebaseConfig` with your own config:

```js
const firebaseConfig = {
     /* your credentials here */
};
```

Next, replace `vapidKey` with your own generated key from Firebase Cloud Messaging in the following:

```js
export const fetchToken = (setTokenFound, onTokenFound, onPermissionRequired, onError) => {
  return getToken(messaging, {vapidKey: '/* your credentials here */'}).then((currentToken) => {
    ...
  });
}
```

Next, replace the key in `chatkitty.js` with your own API key:

```js
const chatkitty = ChatKitty.getInstance(/*your credentials here*/);
```

Lastly, in `app.js` replace the user's information with users from your own app:

``` js
  const result = await chatkitty.startSession({ username: /* user's credentials */ });
```

## Running the App
`yarn start`

## Testing Push Notifications

To test if push notifications work, allow notification permission on your browser. Then, send a message to the user. You should now see a received message notification. 