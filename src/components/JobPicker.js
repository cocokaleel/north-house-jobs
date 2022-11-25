var date_list = [1, 2, 3, 4];

const generateDays = () => {
    const rows = [];
    for (let i = 0; i < date_list.length; i++) {
        rows.push(<p>i</p>);
    }
    return rows;
}

function JobPicker() {
 return <div class="job-picker">
    <p>Job picker</p>
    {generateDays}
    </div>
}

export default JobPicker; 
