import React from "react";
import { Database, ref, update} from "firebase/database";

export function getFormattedDate(date_raw : string) : string {
    let date = new Date(date_raw+", 00:00 EST");
    return (date.toLocaleString('en-US', {
      weekday: 'short', // long, short, narrow
      day: 'numeric', // numeric, 2-digit
      year: 'numeric', // numeric, 2-digit
      month: 'short', // numeric, 2-digit, long, short, narrow
    }));
}

type dayProps = {
    date : string,
    jobs : {string : string},
    db : Database;
    db_path : string; //Ex: cycles/2022-11-27-Cycle/2022-11-27/
}

export function Day(props : dayProps) {
    function writeClick(job_name: string) {
        update(ref(props.db, props.db_path), {
            [job_name]: "Claimed", //TODO change this to the username of the current user
        });
      }

    const buttons : any[] = [];

    for (const job in props.jobs) {
        var label = "";
        var disabled = false;
        if (props.jobs[job]===null || props.jobs[job]==="null"|| props.jobs[job]==="") {
            label = job;
        } else {
            label = job+": " +props.jobs[job];
            disabled = true;
        }
        buttons.push(
            <button id={"button-"+props.date+"-"+job} 
                    disabled={disabled} 
                    className={"job-picker-button " + job}
                    onClick={()=>writeClick(job)}>
                {label}
            </button>
            );
    }

    return <div className="job-picker-day-wrapper">
        <p>{getFormattedDate(props.date)}</p>
        {buttons}
    </div>
}

export default Day;