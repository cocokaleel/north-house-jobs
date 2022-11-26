import React from "react";
import { Database, getDatabase, ref, set , onValue, update} from "firebase/database";

type dayProps = {
    date : string,
    jobs : {string : string},
    db : Database;
    db_path : string; //Ex: cycles/2022-11-27-Cycle/2022-11-27/
}

function Day(props : dayProps) {
    function writeClick(job_name: string) {
        console.log("setting: " + job_name);
        update(ref(props.db, props.db_path), {
            [job_name]: "Claimed", //TODO change this to the username of the current user
        });
      }

    const buttons : any[] = [];

    for (const job in props.jobs) {
        var label = "";
        var disabled = false;
        if (props.jobs[job]==null || props.jobs[job]=="null"|| props.jobs[job]=="") {
            label = job;
        } else {
            label = job+": " +props.jobs[job];
            disabled = true;
        }
        console.log(job);
        buttons.push(
            <button id={"button-"+props.date+"-"+job} 
                    disabled={disabled} 
                    className={"job-picker-button"}
                    onClick={()=>writeClick(job)}>
                {label}
            </button>
            );
    }

    return <div className="job-picker-day-wrapper">
        <p>{props.date}</p>
        {buttons}
    </div>
}

export default Day;