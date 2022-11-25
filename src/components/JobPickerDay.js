function Day(props) {
    const buttons = [];

    for (const job in props.jobs) {
        var label = "";
        var disabled = false;
        if (props.jobs[job]==null || props.jobs[job]=="null") {
            label = job;
        } else {
            label = props.jobs[job];
            disabled = true;
        }
        buttons.push(<button key={"button-"+props.date+"-"+job} disabled={disabled} className={"job-picker-button"}>{label}</button>);
    }

    return <div className="job-picker-day-wrapper">
        <p>{props.date}</p>
        {buttons}
    </div>
}

export default Day;