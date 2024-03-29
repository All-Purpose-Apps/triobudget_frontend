import React from 'react'
import app from './utils/firebaseConfig'
import axios from 'axios';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
signInWithEmailAndPassword(auth, 'j@c.com', 'qwerty')
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // You can get the ID token from the user object
    user.getIdToken().then((idToken) => {
      // Send the token to your server
      axios.get('http://localhost:3000/protected-route', {
        headers: { 'x-token': idToken }
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });

export default function App() {
  return (
    <div>App</div>
  )
}
