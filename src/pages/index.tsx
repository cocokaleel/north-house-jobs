import React, {useState} from 'react';
import './index.css';
import {FirebaseApp} from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type appProps = {
  app: FirebaseApp;
}

function Home (props: appProps) {
  const [userId, setUserId] = useState<string>();
  var uid;
  var signedIn : boolean = false;

  const auth = getAuth(props.app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;
      setUserId(user.uid);
      console.log('user id from home page')
      // ...
    } else {
      // User is signed out
      // ...
      setUserId("no user");
    }
  });

  return (
    <div className="page-wrapper">
      <h1>Home</h1>
      <div className="App">
       <header className="App-header">
         <h1>North House Jobs</h1>
         <p>User id: {userId}</p>
       </header>
     </div>
    </div>
  );
};
  
export default Home;