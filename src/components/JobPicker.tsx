import React, { useState } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { initializeApp } from "firebase/app";
import Day from "./JobPickerDay.tsx";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://eph-jobs-tracker-default-rtdb.firebaseio.com/",
};
//TODO is it weird to do it here
// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase();

type cycleProps = {
    cycle: string;
}
/**
 * Creates a JobPicker for the specified cycle
 * @param {String} props "Cycle", formatted 'YYYY-MM-DD-Cycle', taken from the first level of the cycle
 * @returns 
 */
function JobPicker(props: cycleProps) {
    const [cycleData, setCycleData] = useState<{string: string}>();
    const cycleDataRef = ref(database, ("cycles/").concat(props.cycle));
    
    
    //Load the data
    function load_data () {
        onValue(cycleDataRef, (snapshot) => {
            setCycleData(snapshot.val());
            var data = snapshot.val();
            console.log(data);
        });
    }

    //Generate the date objects filled with buttons in the job picker
    function generateDays() {
        if (cycleData===undefined) {
            //TODO fix this is a janky solution this should be on the onLoad (which wasn't working)
            load_data();
            return <p>Data has not been loaded yet.</p>
        } else {
            let job_picker_days : any[] = []; //todo any is bad
            for (let date in cycleData) {
                job_picker_days.push(
                <Day 
                    date={date} 
                    jobs={cycleData[date]} 
                    key={"job-picker-day-"+date }
                    db={database} 
                    db_path={"cycles/"+props.cycle+"/"+date+"/"}
                />);
            }
            return job_picker_days;
        }
    }
    
    return (
        <div className="job-picker-wrapper">
            <p>Job picker</p>
            {generateDays()}
        </div>
        );
}

export default JobPicker
