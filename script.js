// Get the current URL of the webpage
const currentUrl = window.location.href;

// Define the pattern for matching for viewattendancesubject page
const urlPattern1 = /^https:\/\/[a-zA-Z0-9-]+\.etlab\.in\/ktuacademics\/student\/viewattendancesubject\//;
const urlPattern2 = /^https:\/\/[a-zA-Z0-9-]+\.etlab\.in\/ktuacademics\/student\/viewattendancesubjectdutyleave\//;

// Check if the current URL matches the pattern
if (urlPattern1.test(currentUrl) || urlPattern2.test(currentUrl)) {
    // console.log("This is the desired webpage!");

    // Get the table element
    const table = document.querySelector('.items');

    if (table) {
        const tbody = table.querySelector('tbody');
        const row = tbody.querySelectorAll('tr')[0];
        const columns = row.querySelectorAll('td');
        const values = Array.from(columns).map(column => column.textContent.trim());
        // console.log(values);

        var newCellValues = ["", "", ""]
        for (var i = 3; i < values.length - 2; i++) {
            const cellValuePattern = /^(\d+)\/(\d+)\s+\(\d+%\)$/;
            const match = values[i].match(cellValuePattern);

            if (match) {
                const attendedClasses = parseInt(match[1]);
                const totalClasses = parseInt(match[2]);
                var bunkPercentage = Math.round((attendedClasses / (totalClasses + 1)) * 100)
                var attendPercentage = Math.round(((attendedClasses + 1) / (totalClasses + 1)) * 100)
                var canBunk = bunkPercentage >= 75;

    //             console.log(`${values[i]}
    // Attended : ${attendedClasses}
    // Total    : ${totalClasses}
    // If bunk  : ${bunkPercentage}%
    // If attend: ${attendPercentage}%`);

                var newDiv = `
<div class="classBunkerCell">
    <div class="classBunkerContainer">
        <div class="classBunkerAttendPercentage"><i class="icon icon-check"></i>${attendPercentage}%</div>
        <div class="classBunkerBunkPercentage"><i class="icon icon-share"></i>${bunkPercentage}%</div>
    </div>

    <div class="${canBunk?"classBunkerActionBunk":"classBunkerActionAttend"}">
        <b>${canBunk?"You Can Bunk": "Please Attend"}</b>
    </div>
</div>
`
                newCellValues.push(newDiv)
            } else {
                // console.log("Text does not match the pattern.");
                newCellValues.push("")
            }

        }

        newCellValues.push("")
        newCellValues.push("")

        const newRow = document.createElement('tr');
        newCellValues.forEach(value => {
            const cell = document.createElement('td');
            cell.innerHTML = value;
            newRow.appendChild(cell);
        });

        // Append the new row to the table body
        tbody.appendChild(newRow);

    } else {
        // console.log("Table not found on the page.");
    }

}
