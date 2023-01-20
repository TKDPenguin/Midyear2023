/*
    TODO:
    - use storage api to store data across google accounts
    - determine a system to structure the table
*/


const table = document.querySelector("table") as HTMLTableElement;

let rowLength = table.rows.length;
import { getData, data, clearData, updateData, updateHTML, printData} from "./background";

getData();

console.log("data btw:");
printData(data);
if (data.length == 0){
    console.log("data is empty, so we need to update the data");
    updateData(table);
}
else {
    console.log("data is not empty, so lets instead update our HTML");
    updateHTML(table);
}

// chrome.storage.sync.get("data").then((result) => {
//     console.log("result[data]: " + result["data"]);
//     if (result["data"].length == 0) {
//         // first time creating data 
//         console.log("data is empty");
//         updateData(table);
//     }
//     // not empty... there for we need to load the inputs with info
//     else {
//         console.log("data is not empty");
//         printData(data);
//         updateHTML(table);
//     }
// });

addListeners();
function addListeners() {
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
                inpEl.addEventListener("change", (event) => {
                    updateData(table);
                });
            }
        }
    }
    
    console.log("data after adding listeners");
    printData(data);
}

console.log("data is " + data);

