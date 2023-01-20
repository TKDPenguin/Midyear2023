"use strict";
// const key = 'myKey';
// const value = { name: 'my value' };
Object.defineProperty(exports, "__esModule", { value: true });
exports.printData = exports.updateData = exports.updateHTML = exports.getData = exports.clearData = exports.data = void 0;
// chrome.storage.local.set({key: value}, () => {
//   console.log('Stored name: ' + value.name);
// });
exports.data = [];
chrome.storage.sync.set({ "data": exports.data });
function clearData() {
    exports.data = new Array(0);
}
exports.clearData = clearData;
function getData() {
    console.log("running getData");
    chrome.storage.sync.get("data", function (obj) {
        console.log(obj);
    });
    chrome.storage.sync.get("data").then((result) => {
        console.log("result[data]: " + result["data"]);
        for (let i = 0; i < result["data"].length; i++) {
            for (let j = 0; j < result["data"][i].length; j++) {
                console.log(result["data"][i][j]);
            }
        }
    });
}
exports.getData = getData;
function updateHTML(table) {
    const rowLength = table.rows.length;
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
                console.log("we are in updateHTML and data is ");
                printData(exports.data);
                console.log(`data[i][j] is ${exports.data[i][j]}`);
                inpEl.value = exports.data[i][j];
            }
        }
    }
}
exports.updateHTML = updateHTML;
// Call when an input is changed
function updateData(table) {
    clearData();
    console.log("we need to update data");
    const rowLength = table.rows.length;
    for (let i = 0; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i);
        let cells = items.cells;
        let rowData = new Array(0);
        //gets amount of cells of current row
        let cellLength = cells.length;
        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j);
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                const inpEl = elements[0];
                console.log(`we are adding ${inpEl.value} to data ${exports.data}`);
                rowData.push(inpEl.value);
            }
        }
        exports.data.push(rowData);
    }
    console.log("data after updateData");
    printData(exports.data);
    chrome.storage.sync.set({ "data": exports.data });
    chrome.storage.sync.get(["data"]).then((result) => {
        console.log(`Value is currently ${result["data"]}`);
    });
}
exports.updateData = updateData;
function printData(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            console.log(data[i][j]);
        }
    }
}
exports.printData = printData;
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(`Storage key "${key}" in namespace "${namespace}" changed.`, `Old value was "${oldValue}", new value is "${newValue}".`);
    }
});
//# sourceMappingURL=background.js.map