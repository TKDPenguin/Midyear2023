/*
    TODO:
    - use storage api to store data across google accounts
    - determine a system to structure the table
*/


const table = document.querySelector("table") as HTMLTableElement;

let rowLength = table.rows.length;
import { data, clearData, updateData } from "./background";

chrome.storage.sync.get("data").then((result) => {
    if (result["data"] == "") {
        // first time creating data 
        console.log("data is empty");
    }
    // not empty... there for we need to load the inputs with info
    else {
        console.log("data is not empty");
    }
});

startData();
function startData() {
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
                let key: string = cellVal.cellIndex.toString() as string;
                const inpEl = elements[0] as HTMLInputElement;
                inpEl.addEventListener("change", (event) => {
                    updateData(table);
                    // somehow change data based on our thingy
                    // data.concat(inpEl.value);
                    // chrome.storage.sync.set({ "data": data });
                });
            }
        }
    }
}

console.log("data is " + data);

