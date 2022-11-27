import './JobPicker.css'
import React, { useEffect, useState } from 'react';
import { Database, ref, onValue} from "firebase/database";
import Day from "./JobPickerDay.tsx";

type cycleProps = {
    cycle: string;
    // data: {string: string};
    database: Database;
}
/**
 * Creates a JobPicker for the specified cycle
 * @param {String} props "Cycle", formatted 'YYYY-MM-DD-Cycle', taken from the first level of the cycle
 * @returns 
 */
function JobPicker(props: cycleProps) {
    const [cycleData, setCycleData] = useState<{string: string}>();

    useEffect(()=>{
        console.log("JOB PICKER USE EFFECT");
        load_data();
    }, [props.cycle]);//[props.cycle]

    // Load the data
    function load_data () {
        var cycleDataRef = ref(props.database, "cycles/"+props.cycle);
        onValue(cycleDataRef, (snapshot) => {
            setCycleData(snapshot.val());
        });
    }

    //Generate the date objects filled with buttons in the job picker
    function generateDays() {
        let job_picker_days : any[] = []; //todo any is bad
        for (let date in cycleData) {
            job_picker_days.push(
            <Day 
                date={date} 
                jobs={cycleData[date]} 
                key={"job-picker-day-"+date }
                db={props.database} 
                db_path={"cycles/"+props.cycle+"/"+date+"/"}
            />);
        }
        return job_picker_days;
    }

    return (
            <div className="job-picker-cycle-days-wrapper" >
                {generateDays()}
            </div>
        );
}

export default JobPicker
