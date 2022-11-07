import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchToken, onMessageListener } from './firebase';
import { Button, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import chatkitty from "./chatkitty.js";

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);

  const initialize = async () => {
    const result = await chatkitty.startSession({ username: 'c6f75947-af48-4893-a78e-0e0b9bd68580' });

    console.log(result);

    fetchToken(setTokenFound, async (token) => {
      await chatkitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          firebaseToken: token
        };
        return user;
      })
    }, () => { console.log("permission required") }, (err) => { console.log("an error occured: ", err) });
  }

  useEffect(() => {
    initialize().then();
  }, [])

  onMessageListener().then(payload => {
    setNotification({ title: payload.notification.title, body: payload.notification.body })
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  const onShowNotificationClicked = () => {
    setNotification({ title: "Notification", body: "This is a test notification" })
    setShow(true);
  }

  return (
    <div className="App">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200
      }}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button>
      </header>

    </div>
  );
}

export default App;
