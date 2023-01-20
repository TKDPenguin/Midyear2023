// const key = 'myKey';
// const value = { name: 'my value' };

// chrome.storage.local.set({key: value}, () => {
//   console.log('Stored name: ' + value.name);
// });

export let data: string[][] = [];

chrome.storage.sync.set({ "data": data });
export function clearData() {
    data = new Array(0);
}

export function getData() {
    console.log("running getData");
    chrome.storage.sync.get("data", function(obj) {
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


export function updateHTML(table: HTMLTableElement) {
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
                printData(data);
                console.log(`data[i][j] is ${data[i][j]}`);
                inpEl.value = data[i][j];
            }
        }
    }
}

// Call when an input is changed
export function updateData(table: HTMLTableElement) {
    clearData();
    console.log("we need to update data");

    const rowLength = table.rows.length;

    for (let i = 0; i < rowLength; i++) {
        //gets cells of current row
        let items = table.rows.item(i) as HTMLTableRowElement;
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
                console.log(`we are adding ${inpEl.value} to data ${data}`);
                rowData.push(inpEl.value);
            }
        }
        data.push(rowData);
    }
    console.log("data after updateData");
    printData(data);
    chrome.storage.sync.set({ "data": data });
    chrome.storage.sync.get(["data"]).then((result) => {
        console.log(`Value is currently ${result["data"]}`);
    });
}

export function printData(data: string[][]) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            console.log(data[i][j]);
        }
    }
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});