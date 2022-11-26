import './JobPicker.css'
import React, { useEffect, useState } from 'react';
import { Database, ref, onValue} from "firebase/database";
import Day from "./JobPickerDay.tsx";

type cycleProps = {
    cycle: string;
    database: Database;
}
/**
 * Creates a JobPicker for the specified cycle
 * @param {String} props "Cycle", formatted 'YYYY-MM-DD-Cycle', taken from the first level of the cycle
 * @returns 
 */
function JobPicker(props: cycleProps) {
    const [cycleData, setCycleData] = useState<{string: string}>();
    var cycleDataRef = ref(props.database, "cycles/"+props.cycle);

    useEffect(()=>load_data, [props.cycle])

    //Load the data
    function load_data () {
        console.log("reloaded data for job picker")
        onValue(cycleDataRef, (snapshot) => {
            setCycleData(snapshot.val());
        });
    }

    //Generate the date objects filled with buttons in the job picker
    function generateDays() {
        if (cycleData===undefined) {
            load_data();
        }
        console.log("generated days");
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
