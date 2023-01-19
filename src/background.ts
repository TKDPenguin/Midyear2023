// const key = 'myKey';
// const value = { name: 'my value' };

// chrome.storage.local.set({key: value}, () => {
//   console.log('Stored name: ' + value.name);
// });

export let data: string[][] = [];

export function clearData() {
    data = [];
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
        let rowData: string[] = new Array(cells.length);

        //gets amount of cells of current row
        let cellLength: number = cells.length;

        //loops through each cell in current row
        for (var j = 0; j < cellLength - 1; j++) {
            let cellVal = cells.item(j) as HTMLTableCellElement;
            let elements = cellVal.getElementsByTagName("input");
            if (elements[0] != null) {
                let key: string = cellVal.cellIndex.toString() as string;
                const inpEl = elements[0] as HTMLInputElement;
                console.log(`we are adding ${inpEl.value} to data ${data}`);
                rowData[cellVal.cellIndex] = inpEl.value;
            }
        }
        data.push(rowData);
    }
    console.log("our current data is " + data);
    chrome.storage.sync.set({"data": data });
    console.log("our current data is " + data);
    chrome.storage.sync.get(["data"]).then((result) => {
        console.log(`Value is currently ${result["data"]}`);
    });
}


chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});