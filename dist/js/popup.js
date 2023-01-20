"use strict";
/*
    TODO:
    - use storage api to store data across google accounts
    - determine a system to structure the table
*/
Object.defineProperty(exports, "__esModule", { value: true });
const table = document.querySelector("table");
let rowLength = table.rows.length;
const background_1 = require("./background");
(0, background_1.getData)();
console.log("data btw:");
(0, background_1.printData)(background_1.data);
if (background_1.data.length == 0) {
    console.log("data is empty, so we need to update the data");
    (0, background_1.updateData)(table);
}
else {
    console.log("data is not empty, so lets instead update our HTML");
    (0, background_1.updateHTML)(table);
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
        let items = table.rows.item(i);
        let cells = items.cells;
        //gets amount of cells of current row
        let cellLength = cells.length;
        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j);
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0];
                inpEl.addEventListener("change", (event) => {
                    (0, background_1.updateData)(table);
                });
            }
        }
    }
    console.log("data after adding listeners");
    (0, background_1.printData)(background_1.data);
}
console.log("data is " + background_1.data);
//# sourceMappingURL=popup.js.map