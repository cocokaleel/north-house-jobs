import React, { useEffect, useState } from 'react';
import './index.css';
import JobPicker from '../components/JobSelection/JobPicker.tsx';
import {getFormattedDate} from '../components/JobSelection/JobPickerDay.tsx'
import { getDatabase, ref, get, child} from "firebase/database";
import { FirebaseApp } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";

type appProps = {
  app: FirebaseApp;
}



/**
 * @returns The HTML for the job selection page
 */
function SelectJobs (props: appProps) {
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(props.app);
  const cycleDataRef = ref(database, "cycles/");
  //get a reference to auth
  const [localEmail, setLocalEmail] = useState<string>();
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [cycleData, setCycleData] = useState<{string: string}>();
  const [chosenCycle, setChosenCycle] = useState<string>("");
  const auth = getAuth(props.app);



  useEffect(()=>{
    console.log("USE EFFECT");

    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setLocalEmail(user.email?user.email:"[Not logged in]");
      setSignedIn(true);
      // ...
    } else {
      // User is signed out
      // ...
      setSignedIn(false);
      setLocalEmail("[Not logged in]");
    }
    });

    const dbRef = ref(database);
    get(child(dbRef, "cycles/")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setCycleData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  
  //get just the cycle date from the database YYYY-MM-DD-Cycle entry name
  function getCycleDate(cycle_raw : string) : string {
    let cleanedUp : string = cycle_raw.replace("-Cycle", "");
    return cleanedUp;
  }


  function generateSelect() {
    let options : any[] = [];
    
    for (const cycle in cycleData) {
      options.push(<option key={"cycle-picker-"+cycle} value={cycle}>{"Cycle starting: " + getFormattedDate(getCycleDate(cycle))}</option>)
    }

    return (
      <div className="jobs-cycle-picker">
        <label htmlFor="cycle-picker">Choose a cycle: </label>
         {/* value={chosenCycle} */}
        <select name="cycle-picker" id="cycle-picker" value={chosenCycle} onChange={(e) => setChosenCycle(e.target.value)}> 
          {options}
        </select>

        {/* <button onClick={load_data}>Load this cycle</button> */}
      </div>
    );
  }

  function generateJobPicker() {
    if (signedIn) {
      return <JobPicker cycle={chosenCycle} database={database}/>;
    } else {
      return null;
    }
  }
  

  console.log("i'm getting rerendered");
  return (
    <div className="page-wrapper">
      <h1>Select Jobs</h1>
      <p>Welcome to the job selection portal for Brown Environmental Program House 2: Electric Boogaloo (North House). Below
        there is a dropdown for which cycle you want to select/view jobs for! Once you select an option, the cycle portal
        for that 2-week period will show up.
      </p>
      <h2>Welcome {localEmail}</h2>
      {/* <button onClick={()=>load_data()}>Load data</button> */}
      <input type="text" onChange={(e)=>setChosenCycle(e.target.value)} value={chosenCycle}></input>
      {/* <p>Chosen cycle: {chosenCycle}</p> */}
      {generateSelect()}
      {/* */}
      {generateJobPicker()}
    </div>
  );
};
  
export default SelectJobs;