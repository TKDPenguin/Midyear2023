// wait what if instead of using background.. we just use popup

// when popup opens.. lets try local variable

export { };
let localData: string[][] = [];

let table = document.querySelector("table") as HTMLTableElement;

let selection_lookup = ["date", "priority"];

chrome.runtime.onInstalled.addListener((details) => {
    console.log("we have just installed this for the first time!!!");
});

chrome.runtime.onStartup.addListener(() => {
    console.log("we have just started up this");
});

await chrome.storage.sync.get("data").then(async (result) => {
    console.log("result[data]: " + result["data"]);
    if (result["data"] == undefined) {
        console.log("first time creating data!");
        await setDefault();
    }
});

await fetchData();
await addListeners();
await createHTMLFromData();

async function resetLocalData() {
    localData = [];
}

async function clearChromeData() {
    chrome.storage.sync.set({ "data": [] });
}

async function setDefault() {
    console.log("set default");
    resetLocalData();
    localData.push(["date"]);
    localData.push(["Click here!", "Some Assignements", "0001-01-01", "1", "0"]);
    await chrome.storage.sync.set({ "data": localData });
}

async function fetchData() {
    await resetLocalData();
    console.log("running fetchData");

    chrome.storage.sync.get(["data"]).catch((reason) => {
        console.log("the reason we couldnt find data is " + reason.type);
        resetLocalData();
    });

    await chrome.storage.sync.get("data").then(async (result) => {
        // console.log("result[data]: " + result["data"]);
        if (result["data"] == undefined) {
            // console.log("first time creating data!");
            await setDefault();
        }
        if (result["data"] == "") {
            // console.log("chrome's data is empty");
            await setLocalData();
        }

        // console.log("result[data] is " + typeof result["data"]);
        // if (result["data"] == undefined) {
        //     console.log("some error here idk why");
        //     await clearChromeData();
        //     await setLocalData();
        // }

        // console.log("the type of result[data][1] is " + typeof result["data"][1]);
        // console.log("the actual of result[data][1] is " + result["data"][1]);
        // console.log("the length of result[data][1] is " + result["data"][1].length);

        for (let i = 0; i < result["data"].length; i++) {
            let rowData: string[] = [];
            console.log("we are in for loop and result[data][i].length is " + typeof result["data"][i].length);
            if (result["data"][i].length == 0) {
                continue;
            }
            for (let j = 0; j < result["data"][i].length; j++) {
                console.log("i: " + i + " j: " + j);
                console.log("result[data][i][j] is " + result["data"][i][j]);
                rowData.push(result["data"][i][j]);
            }
            localData.push(rowData);
        }
    });
    console.log("local data after setLocal");
    printData(localData);
}


async function removeData(index: number) {
    // shift everything once to the left
    // await setLocalData();
    // increase index because we need to account for the sort setting
    console.log("we are removing index " + index + " localData.length " + localData.length);
    printData(localData);
    console.log("lets quickly remove sort");
    let sort_value = localData.shift() as string[];
    printData(localData);
    // edge case.. if its the last thing in the list
    if (index == localData.length) {
        console.log("last index");
        localData.pop();
        console.log("removing data");
        printData(localData);
        localData.unshift(sort_value);
        await chrome.storage.sync.set({ "data": localData });
        return;
    }
    let length = localData.length;
    for (let i = index; i < length; i++) {
        localData[i - 1] = localData[i];
    }
    localData.pop();

    console.log("removing data");
    printData(localData);
    console.log("unshift");
    localData.unshift(sort_value);
    printData(localData);
    await chrome.storage.sync.set({ "data": localData });
}

/* 
* based on the HTML
* sets the local data    
* then sets chromes data
*/
async function setLocalData() {
    console.log("setting local data from HTML");

    // first clear local data first
    resetLocalData();

    let table = document.querySelector("table") as HTMLTableElement;
    // console.log("table is " + typeof table);
    const rowLength = table.rows.length;

    // console.log("rowLength is " + rowLength);

    for (let i = 1; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i) as HTMLTableRowElement;
        let cells = items.cells;

        // console.log("cells is " + cells);
        //gets amount of cells of current row
        let cellLength: number = cells.length;
        // console.log("cellLength is " + cellLength);
        let rowData: string[] = [];

        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let inpElements = cellVal.getElementsByTagName("input");
            let selectElements = cellVal.getElementsByTagName("select");
            if (inpElements[0] != null) {
                const inpEl = inpElements[0] as HTMLInputElement;
                rowData.push(inpEl.value);
            }
            if (selectElements[0] != null) {
                const selectEl = selectElements[0] as HTMLSelectElement;
                rowData.push(selectEl.value);
            }
        }
        console.log("row data is " + rowData)
        // console.log("row data length is " + rowData.length);
        localData.push(rowData);
    }
    let sort = document.querySelector("#sort") as HTMLSelectElement;
    let sort_value = sort.options[sort.selectedIndex].value;
    localData.unshift([sort_value]);
    let changed = await sortLocalData();
    // console.log("localData after sorting");
    // printData(localData);
    await chrome.storage.sync.set({ "data": localData });
    if (changed)
        await createHTMLFromData();
}

/*
    Returns false if data was not changed
    otherwise returns true
*/
async function sortLocalData() {
    let copyData = JSON.parse(JSON.stringify(localData)); 
    let sort = document.querySelector("#sort") as HTMLSelectElement;
    let sort_value = sort.options[sort.selectedIndex].value;
    console.log("sort value is " + sort_value);
    printData(localData);
    localData.shift();
    console.log("local data after shift");
    printData(localData);
    switch (sort_value) {
        case "date":
            localData.sort(function(a, b) {
                if (a[2] == "" && b[2] == "") {
                    console.log("Local data has been sorted to: " + localData);
                    return 0;
                } else if (a[2] == "") {
                    console.log("Local data has been sorted to: " + localData);
                    return new Date(b[2]).getTime() * -1;
                } else if (b[2] == "") {
                    console.log("Local data has been sorted to: " + localData);
                    return new Date(a[2]).getTime();
                } else {
                    console.log("Local data has been sorted to: " + localData);
                    return new Date(a[2]).getTime() - new Date(b[2]).getTime();
                }
            });
            break;
        case "priority":
            localData.sort(function(a, b) {
                if (b[3] == a[3]) return 0;
                else if (Number(b[3]) > Number(a[3])) return 1;
                else return -1;
            });
            break;
    }
    // add the sort value to the very beginning of localData
    localData.unshift([sort_value]);
    console.log("sorted localData");
    return JSON.stringify(localData) !== JSON.stringify(copyData);
}

async function createHTMLFromData() {
    console.log("creating HTML from Data");

    if (localData.length == 1) {
        console.log("local data is empty so lets make something else");
        let header1 = document.createElement('h1');
        header1.textContent = "Up to date!";
        header1.classList.add("up-to-date");
        document.body.replaceChild(header1, table);
        return;
    }

    let newTable = document.createElement('table');
    newTable.classList.add("styled-table");

    // Create an empty <thead> element and add it to the table:
    let header = newTable.createTHead();

    // Create an empty <tr> element and add it to the first position of <thead>:
    let headersRow = header.insertRow(0);

    // Insert a new cell (<td>) at the first position of the "new" <tr> element:
    let header1 = headersRow.insertCell(0);
    let header2 = headersRow.insertCell(1);
    let header3 = headersRow.insertCell(2);
    let header4 = headersRow.insertCell(3);
    let header5 = headersRow.insertCell(4);

    // Add some bold text in the new cell:
    header1.innerHTML = "<b>Subject</b>";
    header2.innerHTML = "<b>Assignment</b>";
    header3.innerHTML = "<b>Due</b>";
    header4.innerHTML = "<b>Priority</b>";
    header5.innerHTML = "<b>Done</b>";
    // printData(localData);
    for (let i = 1; i < localData.length; i++) {
        let row = newTable.insertRow(i);
        let subject = row.insertCell(0);
        let assignment = row.insertCell(1);
        let dueDate = row.insertCell(2);
        let priority = row.insertCell(3);
        let done = row.insertCell(4);

        subject.innerHTML = `<input type="text" value="${localData[i][0]}">`;
        // console.log("cell1 = " + subject.innerHTML);
        assignment.innerHTML = `<input type="text" value="${localData[i][1]}">`;
        // console.log("cell2 = " + assignment.innerHTML);
        dueDate.innerHTML = `<input type="date" value="${localData[i][2]}">`;
        // console.log("cell3 = " + dueDate.innerHTML);
        let priority_value = localData[i][3];
        // console.log(`localdata[${i}][3] = ${localData[i][3]}`)
        switch (priority_value) {
            case "3":
                priority.innerHTML = `
                <select name="priority${i}" id="priority${i}">
                    <option value="3" selected>High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                </select>`;
                break;
            case "2":
                priority.innerHTML = `
                <select name="priority${i}" id="priority${i}">
                    <option value="3">High</option>
                    <option value="2" selected>Medium</option>
                    <option value="1">Low</option>
                </select>`;
                break;
            case "1":
                priority.innerHTML = `
                <select name="priority${i}" id="priority${i}">
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1" selected>Low</option>
                </select>`;
                break;
            default:
                priority.innerHTML = `
                <select name="priority${i}" id="priority${i}">
                    <option value="3" selected>High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                </select>`;
        }
        // console.log("cell3 = " + dueDate.innerHTML);
        done.innerHTML = `<button>Done</button>`;
        subject.addEventListener("change", () => {
            setLocalData();
        });
        assignment.addEventListener("change", () => {
            setLocalData();
        });
        dueDate.addEventListener("change", () => {
            setLocalData();
        });
        priority.addEventListener("change", () => {
            setLocalData();
        });
        done.addEventListener("click", () => {
            console.log("buton clicked! " + i);
            removeData(i);
            createHTMLFromData();
        })
    }
    // set the value of the sort thingy
    let sort = document.querySelector("#sort") as HTMLSelectElement;
    sort.selectedIndex = selection_lookup.indexOf(localData[0][0]);

    if (table.parentNode != null) {
        table.parentNode?.replaceChild(newTable, table);
        console.log("we replaced table");
    }
    else if (document.querySelector(".up-to-date")) {
        let up = document.querySelector(".up-to-date") as HTMLHeadingElement;
        up.parentNode?.replaceChild(newTable, up);
        console.log("we replaced header");
    }
    table = newTable;
}



async function addListeners() {
    console.log("we are in the function addListeners");
    let sort_option = document.querySelector("#sort") as HTMLSelectElement;
    sort_option.addEventListener("change", () => {
        console.log("changed!! sort!!");
        setLocalData();
    });
    let table = document.querySelector("table") as HTMLTableElement;
    let rowLength = table.rows.length;
    for (let i = 0; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i) as HTMLTableRowElement;
        let cells = items.cells;

        //gets amount of cells of current row
        let cellLength: number = cells.length;

        //loops through each cell in current row
        for (let j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0] as HTMLInputElement;
                // console.log("we are adding listener to " + inpEl.name);
                inpEl.addEventListener("change", (event) => {
                    setLocalData();
                });
            }
        }
        let butval = cells.item(cellLength - 1) as HTMLTableCellElement;
        let els = butval.getElementsByTagName("button");
        if (els[0] != null) {
            const butel = els[0] as HTMLButtonElement;
            console.log("adding event listener to button");
            butel.addEventListener("click", () => {
                console.log("buton clicked! " + i);
                removeData(i);
                createHTMLFromData();
            })
        }
    }
}


// add to localData and then createDataFromHTML;
async function addTableRows(table: HTMLTableElement, add: HTMLTableElement) {
    let items = add.rows.item(0) as HTMLTableRowElement;
    let cells = items.cells;
    let rowData: string[] = new Array(0);

    for (let i = 0; i < cells.length - 1; i++) {
        let cellVal = cells.item(i) as HTMLTableCellElement;
        let inpElements = cellVal.getElementsByTagName("input");
        if (inpElements[0] != null) {
            const inpEl = inpElements[0] as HTMLInputElement;
            rowData.push(inpEl.value);
            inpEl.value = "";
        }
        // let selectElements = cellVal.getElementsByTagName("select");
        // if (selectElements[0] != null) {
        //     const selectEl = selectElements[0] as HTMLSelectElement;
        //     rowData.push(selectEl.value);
        // }
    }
    let select = document.getElementById(`addPriority`) as HTMLSelectElement;
    let priority = select.options[select.selectedIndex].value;
    rowData.push(priority)
    console.log(`add ${rowData.toString()}`)
    localData.push(rowData);
    await sortLocalData();
    await chrome.storage.sync.set({ "data": localData });
    await createHTMLFromData();
}

const addTable = document.querySelector("#addingTable") as HTMLTableElement;
const addButton = document.querySelector("#add") as HTMLButtonElement;
addButton.addEventListener("click", () => {
    addTableRows(table, addTable);
});

async function printData(data: string[][]) {
    console.log("data.length: " + data.length);
    for (let i = 0; i < data.length; i++) {
        console.log("data[i].length is " + data[i].length);
        let row: string = "";
        for (let j = 0; j < data[i].length; j++) {
            console.log(`data[${i}][${j}] is ${data[i][j]}`);
            row += data[i][j] + " ";
        }
        console.log(row);
    }
}
