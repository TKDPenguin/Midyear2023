// wait what if instead of using background.. we just use popup

// when popup opens.. lets try local variable

export { };
let localData: string[][] = [];
let UserSetLocalData : string[][] = [];

let table = document.querySelector("table") as HTMLTableElement;

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
let sort = document.querySelector("#cars") as HTMLSelectElement;
sort.addEventListener("change", (event) => {
    console.log("Identified change in sort");
    setLocalData();
});

async function clearLocalData() {
    localData = [];
}

async function clearChromeData() {
    chrome.storage.sync.set({ "data": [] });
}

async function setDefault() {
    console.log("set default");
    clearLocalData;
    localData.push(["Click here!", "Some Assignements", "0001-01-01", "low"]);
    UserSetLocalData.push(["Click here!", "Some Assignements", "0001-01-01", "low"]);
    await chrome.storage.sync.set({ "data": localData });
}

async function fetchData() {
    await clearLocalData();
    console.log("running fetchData");

    chrome.storage.sync.get(["data"]).catch((reason) => {
        console.log("the reason we couldnt find data is " + reason.type);
        clearChromeData();
    });

    // chrome.storage.sync.get(["data"], (result) => {
    //     console.log("im trying something new " + result["data"]);
    //     if (result["data"] == ""){
    //         console.log("chrome's data is empty");
    //         setLocalData();
    //     }
    // });
    await chrome.storage.sync.get("data").then(async (result) => {
        console.log("result[data]: " + result["data"]);
        if (result["data"] == undefined) {
            console.log("first time creating data!");
            await setDefault();
        }
        if (result["data"] == "") {
            console.log("chrome's data is empty");
            await setLocalData();
        }

        console.log("result[data] is " + typeof result["data"]);
        if (result["data"] == undefined) {
            console.log("some error here idk why");
            await clearChromeData();
            await setLocalData();
        }

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
            for (let row = 0; row < rowData.length; row++) {
                console.log("row " + row + " data is " + rowData[row]);
            }
            localData.push(rowData);
            UserSetLocalData.push(rowData);
            await printData(localData);
        }
    });
    console.log("local data after setLocal");
    printData(localData);
}


async function removeData(index: number) {
    // shift everything once to the left
    // await setLocalData();
    console.log("we are removing index " + index + " localData.length " + localData.length);
    printData(localData);
    // edge case.. if its the last thing in the list
    if (index == localData.length) {
        console.log("some weird error");
        return;
    }
    if (index == localData.length - 1){
        console.log("last index");
        localData.pop();
        return;
    }
    let length = localData.length;
    for (let i = index + 1; i < length; i++) {
        localData[i - 1] = localData[i];
    }
    localData.pop();
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
    clearLocalData();

    let table = document.querySelector("table") as HTMLTableElement;
    console.log("table is " + typeof table);
    const rowLength = table.rows.length;

    console.log("rowLength is " + rowLength);

    for (let i = 1; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i) as HTMLTableRowElement;
        let cells = items.cells;

        console.log("cells is " + cells);

        //gets amount of cells of current row
        let cellLength: number = cells.length;

        console.log("cellLength is " + cellLength);

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
        console.log("row data length is " + rowData.length);
        localData.push(rowData);
        UserSetLocalData.push(rowData);
    }
    let value = sort.options[sort.selectedIndex].value;
    switch (value) {
        case "user":
                console.log("UserSetLocalData = " + UserSetLocalData)
                for (let i = 0; i < UserSetLocalData.length; i++) {
                    localData[i] = UserSetLocalData[i];
                }
            break;
            case "date":
                localData.sort(function (a, b) { 
                    if (a[2] == "" && b[2] == "") {
                        console.log("Local data has been sorted to: " + localData);
                        return 0;
                    } else if (a[2] == "") {
                        console.log("Local data has been sorted to: " + localData);
                        return new Date(b[2]).getTime()* -1;
                    }else if (b[2] == "") {
                        console.log("Local data has been sorted to: " + localData);
                        return new Date(a[2]).getTime();
                    } else {
                        console.log("Local data has been sorted to: " + localData);
                        return new Date(a[2]).getTime() - new Date(b[2]).getTime();
                    }
                });
                break;
        case "priority":
            localData.sort(function (a, b) {
                if (b[3] == a[3]) return 0;
                else if (Number(b[3]) > Number(a[3])) return 1;
                else return -1;
            });
            break;
    }
    await chrome.storage.sync.set({ "data": localData });
    await createHTMLFromData();
}

async function createHTMLFromData() {
    console.log("creating HTML from Data");

    if (localData.length == 0){
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
    for (let i = 0; i < localData.length; i++) {
        let row = newTable.insertRow(i + 1);
        let subject = row.insertCell(0);
        let assignment = row.insertCell(1);
        let dueDate = row.insertCell(2);
        let priority = row.insertCell(3);
        let done = row.insertCell(4);

        subject.innerHTML = `<input type="text" value="${localData[i][0]}">`;
        console.log("cell1 = " + subject.innerHTML);
        assignment.innerHTML = `<input type="text" value="${localData[i][1]}">`;
        console.log("cell2 = " + assignment.innerHTML);
        dueDate.innerHTML = `<input type="date" value="${localData[i][2]}">`;
        console.log("cell3 = " + dueDate.innerHTML);
        let value = localData[i][3];
        console.log(`localdata[${i}][3] = ${localData[i][3]}`)
        switch (value) {
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
        console.log("cell3 = " + dueDate.innerHTML);
        done.innerHTML = `<button>Done</button>`;
        subject.addEventListener("change", (event) => {
            setLocalData();
        });
        assignment.addEventListener("change", (event) => {
            setLocalData();
        });
        dueDate.addEventListener("change", (event) => {
            setLocalData();
        });
        priority.addEventListener("change", (event) => {
            setLocalData();
        });
        done.addEventListener("click", () => {
            console.log("buton clicked! " + i);
            removeData(i);
            createHTMLFromData();
        })
    }
    if (table.parentNode != null){
        table.parentNode?.replaceChild(newTable, table);
        console.log("we replaced table");
    }
    else if (document.querySelector(".up-to-date")){
        let up = document.querySelector(".up-to-date") as HTMLHeadingElement;
        up.parentNode?.replaceChild(newTable, up);
        console.log("we replaced header");
    }
    table = newTable;
}

async function setHTML() {
    console.log("updating HTML");
    if (localData.length == 0) {
        console.log("local data is empty");
        printData(localData);
        return;
    }
    const rowLength = table.rows.length;

    for (let i = 0; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i) as HTMLTableRowElement;
        let cells = items.cells;

        //gets amount of cells of current row
        let cellLength: number = cells.length;

        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0] as HTMLInputElement;
                console.log("we are in updateHTML and data is ");
                printData(localData);
                console.log(`i: ${i}, j: ${j}`);
                console.log(`data[i][j] is ${localData[i - 1][j]}`);
                inpEl.value = localData[i - 1][j];
                console.log("we set the inpEl.value ");
            }
        }
    }
}
// chrome.storage.sync.get(["data"]).then((result) => {
//     console.log(`Value is currently ${result["data"]}`);
//     console.log(printData(result["data"]));
// });


async function addListeners() {
    console.log("we are in the function addListeners");
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
            console.log("looping!");
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0] as HTMLInputElement;
                console.log("we are adding listener to " + inpEl.name);
                inpEl.addEventListener("change", (event) => {
                    console.log("input changed!");
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

// ok so we need to use localData.. reorder it how we want to.. 
// then finally set its value to chrome's storage
// call createDataFromHTML at the end
async function reorderData(){
}

async function addTableRows(table: HTMLTableElement, add: HTMLTableElement) {
    let rowLength = add.rows.length;

    for (let i = 0; i < rowLength; i++) {
        //gets cells of current row
        let items = add.rows.item(i) as HTMLTableRowElement;
        let cells = items.cells;
        let rowData: string[] = new Array(0);

        //gets amount of cells of current row
        let cellLength: number = cells.length;

        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0] as HTMLInputElement;
                console.log("we are in AddTableRows and ")
                console.log(`we are adding ${inpEl.value} to data ${localData}`);
                rowData.push(inpEl.value);
                inpEl.value = "";
            }
        }
        let select = document.getElementById(`addPriority`) as HTMLSelectElement;
        let value = select.options[select.selectedIndex].value;
        rowData.push(value)
        console.log("row data length is " + rowData.length);
        console.log("rowData[3] = " + rowData[3]);
        localData.push(rowData);
        UserSetLocalData.push(rowData);
        let newVal = sort.options[sort.selectedIndex].value;
        switch (newVal) {
            case "user":
                break;
            case "date":
                localData.sort(function (a, b) { 
                    if (a[2] == "" && b[2] == "") {
                        console.log("Local data has been sorted to: " + localData);
                        return 0;
                    } else if (a[2] == "") {
                        console.log("Local data has been sorted to: " + localData);
                        return new Date(b[2]).getTime()* -1;
                    }else if (b[2] == "") {
                        console.log("Local data has been sorted to: " + localData);
                        return new Date(a[2]).getTime();
                    } else {
                        console.log("Local data has been sorted to: " + localData);
                        return new Date(a[2]).getTime() - new Date(b[2]).getTime();
                    }
                });
                break;
            case "priority":
                localData.sort(function (a, b) {
                    if (b[3] == a[3]) return 0;
                    else if (Number(b[3]) > Number(a[3])) return 1;
                    else return -1;
                });
                break;
        }

        await chrome.storage.sync.set({ "data": localData });
        await createHTMLFromData();
        // await addListeners();
    }
}

const addTable = document.querySelector("#addingTable") as HTMLTableElement;
const addButton = document.querySelector("#add") as HTMLButtonElement;
addButton.addEventListener("click", (event) => {
    addTableRows(table, addTable);
});


async function printData(data: string[][]) {
    console.log("data.length: " + data.length);
    for (let i = 0; i < data.length; i++) {
        console.log("data[i].length is " + data[i].length);
        for (let j = 0; j < data[i].length; j++) {
            console.log(`data[${i}][${j}] is ${data[i][j]}`);
        }
    }
}
