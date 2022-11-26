import React, {useState} from "react";
import "./CycleCreator.css";

function CycleCreator() {
    const [cycleCreatorStartDate, setCycleCreatorStartDate] = useState<string>();
    const [cycleCreatorEndDate, setCycleCreatorEndDate] = useState<string>();

    //start date, end date, [generate basic layout] button, add specific jobs + notes
    return (
    <div className="cycle-creator-wrapper">
        <h2>Create a new cycle:</h2>
        <div className="cycle-creator-tasks-wrapper">
            <div className="cycle-creator-options-wrapper task">
                <h3 className="cycle-creator-subtitle">Pick Options</h3>
                {/* Start Date */}
                <label htmlFor="cycle-creator-start-date">Pick Start Date</label>
                <input type="date" id="cycle-creator-start-date" className="form-item" onChange={(e)=>setCycleCreatorStartDate(e.target.value)}></input>
                {/* End Date */}
                <label htmlFor="cycle-creator-end-date">Pick End Date</label>
                <input type="date" id="cycle-creator-end-date" className="form-item" onChange={(e)=>setCycleCreatorEndDate(e.target.value)}></input>
                <button id="generate-standard-cycle" className="form-item">Generate Standard Cycle for Each Day</button>
                <label htmlFor="cycle-creator-add-job-date">Add job to date: </label>
                <input type="date" id="cycle-creator-add-job-date"></input>
                <input type="text" id="cycle-creator-add-job" className="form-item" placeholder="Job Name"></input>
                <button className="form-item">Add Job</button>
            </div>
            <div className="cycle-creator-preview-wrapper task">
                <h3 className="cycle-creator-subtitle">Preview</h3>
                <h5>Cycle start date: {cycleCreatorStartDate}</h5>
                <h5>Cycle end date: {cycleCreatorEndDate}</h5>
            </div>
            <div className="cycle-creator-quotas-modifier task">
                <h3 className="cycle-creator-subtitle">Quotas</h3>
            </div>
            <div className="cycle-creator-submission-form task">
                <h3 className="cycle-creator-subtitle">Release</h3>
                <button className="cycle-creator-submission-button form-item" disabled={true}>Release on: </button>
                <input type="date" id="cycle-creator-delayed-release-date-picker" className="form-item" disabled={true}></input>
                <button className="cycle-creator-submission-button form-item">Submit and release immediately!</button>
            </div>
        </div>
    </div>);
}

export default CycleCreator;