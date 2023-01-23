// wait what if instead of using background.. we just use popup

// when popup opens.. lets try local variable

export {};
let localData: string[][] = [];

let table = document.querySelector("table") as HTMLTableElement;

await fetchData();
await addListeners();
await createHTMLFromData();

function clearLocalData() {
    localData = [];
}

function clearChromeData() {
    chrome.storage.sync.set({ "data": "" });
}

async function fetchData() {
    clearLocalData();
    console.log("running fetchData");

    chrome.storage.sync.get(["data"]).catch((reason) => {
        console.log("the reason we couldnt find data is " + reason.type);
    });

    // chrome.storage.sync.get(["data"], (result) => {
    //     console.log("im trying something new " + result["data"]);
    //     if (result["data"] == ""){
    //         console.log("chrome's data is empty");
    //         setLocalData();
    //     }
    // });
    await chrome.storage.sync.get("data").then((result) => {
        console.log("result[data]: " + result["data"]);
        if (result["data"] == "") {
            console.log("chrome's data is empty");
            setLocalData();
        }
        // console.log("the type of result[data][1] is " + typeof result["data"][1]);
        // console.log("the actual of result[data][1] is " + result["data"][1]);
        // console.log("the length of result[data][1] is " + result["data"][1].length);
        for (let i = 0; i < result["data"].length; i++) {
            let rowData: string[] = [];
            for (let j = 0; j < result["data"][i].length; j++) {
                console.log("i: " + i + " j: " + j);
                console.log("result[data][i][j] is " + result["data"][i][j]);
                rowData.push(result["data"][i][j]);
            }
            for (let row = 0; row < rowData.length; row++) {
                console.log("row " + row + " data is " + rowData[row]);
            }
            localData.push(rowData);
            printData(localData);
        }
    });
    console.log("local data after setLocal");
    printData(localData);
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
    const rowLength = table.rows.length;

    for (let i = 0; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i) as HTMLTableRowElement;
        let cells = items.cells;

        //gets amount of cells of current row
        let cellLength: number = cells.length;

        let rowData: string[] = [];

        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0] as HTMLInputElement;
                rowData.push(inpEl.value);
            }
        }
        localData.push(rowData);
    }
    chrome.storage.sync.set({ "data": localData });
}

async function createHTMLFromData() {
    console.log("creating HTML from Data");

    let newTable = document.createElement('table');

    for (let i = 0; i < localData.length; i++) {
        let row = newTable.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = `<input type="text" value="${localData[i][0]}">`;
        console.log("cell1 = " + cell1.innerHTML);
        cell2.innerHTML = `<input type="text" value="${localData[i][1]}">`;
        console.log("cell2 = " + cell2.innerHTML);
        cell3.innerHTML = `<input type="date" value="${localData[i][2]}">`;
        console.log("cell3 = " + cell3.innerHTML);
        cell4.innerHTML = `<button>Done</button>`;
        cell1.addEventListener("change", (event) => {
            setLocalData();
        });
        cell2.addEventListener("change", (event) => {
            setLocalData();
        });
        cell3.addEventListener("change", (event) => {
            setLocalData();
        });
    }
    table.parentNode?.replaceChild(newTable, table);
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
    let table = document.querySelector("table") as HTMLTableElement;
    let rowLength = table.rows.length;
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
                console.log("we are adding listener to " + inpEl.name);
                inpEl.addEventListener("change", (event) => {
                    setLocalData();
                });
            }
        }
    }
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
            }
        }
        localData.push(rowData);
        await chrome.storage.sync.set({ "data": localData });
        await createHTMLFromData();
        await addListeners();
    }
}

const addTable = document.querySelector("#addingTable") as HTMLTableElement;
const addButton = document.querySelector("#add") as HTMLButtonElement;
addButton.addEventListener("click", (event) => {
    addTableRows(table, addTable);
});



function printData(data: string[][]) {
    console.log("data.length: " + data.length);
    for (let i = 0; i < data.length; i++) {
        console.log("data[i].length is " + data[i].length);
        for (let j = 0; j < data[i].length; j++) {
            console.log(`data[${i}][${j}] is ${data[i][j]}`);
        }
    }
}
