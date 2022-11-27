import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import {FirebaseApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

type appProps = {
  app: FirebaseApp;
}
function Navbar(props: appProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = getAuth(props.app);

  function sign_out() {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Signed out");
    }).catch((error) => {
      // An error happened.
      console.log(error.message);
    });
  }

  function sign_in() {
    if (email === "" || email === "null" || password==="" || password==="null") {
      console.log("Something is wrong w ur email or pw re: formatting");
    } else {
      signInWithEmailAndPassword(auth, email?email:"", password?password:"")
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <div className ="navbar-wrapper">
      <nav className="navbar">
          <NavLink to="/" className="navbar-link"> 
            Home
          </NavLink>
          <NavLink to="/admin"  className="navbar-link"> 
            Admin
          </NavLink>
          <NavLink to="/select-jobs" className="navbar-link" >
            Select Jobs
          </NavLink>
      </nav>
      <div id="nav-sign-in-wrapper">
        <input type="email" placeholder="username" id="nav-username" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
        <input type="password" placeholder="password" id="nav-password"onChange={(e)=>setPassword(e.target.value)} value={password}></input>
        <button id="nav-signin-submit" onClick={sign_in}>Submit</button>
        <button id="nav-signout" onClick={sign_out}>Sign Out</button>
      </div>
    </div>
  );
};
  
export default Navbar;