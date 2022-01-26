let input = document.querySelector(".date").children;
function changeDate(catalystMonth = 0, catalystYear = 0) {
    let date = null;
    let chosenDay = input['day'].value;
    let chosenMonth = input['month'].value;
    let chosenYear = input['year'].value;


    if (chosenDay && chosenMonth && chosenYear) {
        let month = Number(chosenMonth) + catalystMonth + 1
        let year = Number(chosenYear) + catalystYear
        if (month == 0) {
            month = 12;
            year = Number(chosenYear) - 1;
        }
        else if (month == 13) {
            month = 1;
            year = Number(chosenYear) + 1;
        }

        let params = `${year} ${month} ${chosenDay}`;

        date = new Date(params);
    }
    else {
        date = new Date();
    }

    chosenDay = input['day'].value = date.getDate();
    input['month'].value = date.getMonth();
    input['year'].value = date.getFullYear();

    let tbody = document.querySelector("#calendar > tbody");

    tbody.innerHTML = "";
    let lastDayOftheMonth = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();

    let tr = document.createElement('tr');

    for (let day = 1; day <= lastDayOftheMonth; day++) {
        let thisDate = new Date(date.getFullYear(), date.getMonth(), day);
        let thisDay = thisDate.getDay();
        if (tr.cells.length == 0) {
            for (let i = 0; i < thisDay; i++) {
                tr.insertCell(i);
            }
        }

        let cell = tr.insertCell(thisDay);
        if (chosenDay == day) {
            cell.classList.add("chosen-date");
        }

        cell.onclick = function () {
            onCellClick(this);
        };

        cell.innerHTML = day;


        if (tr.cells.length == 7) {
            tbody.appendChild(tr);
            tr = document.createElement('tr');
        }
    }

    tbody.appendChild(tr);

    for (let x = tr.cells.length; x < 7; x++) {
        tr.insertCell(x);
    }
}

function onCellClick(cell) {
    input['day'].value = cell.innerHTML
    changeDate();
}

function GoToCurrent(){
    input['day'].value = ""
    changeDate();
}

changeDate();
