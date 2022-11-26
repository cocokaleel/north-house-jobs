import React, { useState } from 'react';
import './index.css';
import JobPicker from '../components/JobSelection/JobPicker.tsx';
import {getFormattedDate} from '../components/JobSelection/JobPickerDay.tsx'
import { getDatabase, ref, onValue} from "firebase/database";
import { FirebaseApp } from "firebase/app";

type appProps = {
  app: FirebaseApp;
}

/**
 * @returns The HTML for the job selection page
 */
function SelectJobs (props: appProps) {
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(props.app);

  const [cycleData, setCycleData] = useState<{string: string}>();
  const [chosenCycle, setChosenCycle] = useState<string>("2022-12-11-Cycle");
  const cycleDataRef = ref(database, "cycles/");
  
  //get just the cycle date from the database YYYY-MM-DD-Cycle entry name
  function getCycleDate(cycle_raw : string) : string {
    let cleanedUp : string = cycle_raw.replace("-Cycle", "");
    return cleanedUp;
  }
  
  //Load the data
  function load_data () {
      onValue(cycleDataRef, (snapshot) => {
          setCycleData(snapshot.val());
          var data = snapshot.val();
          console.log(data);
      });
  }

  function generatePicker() {
    if (cycleData===undefined) {
      load_data();
      return( <p>The data has not been loaded from the server yet. It's coming! If not, text Coco.</p>);
    } else {
      let options : any[] = [];
      
      for (const cycle in cycleData) {
        options.push(<option key={"cycle-picker-"+cycle} value={cycle}>{"Cycle starting: " + getFormattedDate(getCycleDate(cycle))}</option>)
      }

      return (
        <div className="jobs-cycle-picker">
          <label htmlFor="cycle-picker">Choose a cycle: </label>
  
          <select name="cycle-picker" id="cycle-picker" value={chosenCycle} onChange={(e)=> setChosenCycle(e.target.value)}>
            {options}
          </select>
        </div>
      );
    }

  }

  return (
    <div className="page-wrapper">
      <h1>Select Jobs</h1>
      <p>Welcome to the job selection portal for Brown Environmental Program House 2: Electric Boogaloo (North House). Below
        there is a dropdown for which cycle you want to select/view jobs for! Once you select an option, the cycle portal
        for that 2-week period will show up.
      </p>
      {generatePicker()}
      <JobPicker cycle={chosenCycle} database={database}/>
    </div>
  );
};
  
export default SelectJobs;