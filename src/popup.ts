/*
    TODO:
    - use storage api to store data across google accounts
    - determine a system to structure the table
*/

const table = document.querySelector("table") as HTMLTableElement;

let rowLength = table.rows.length;

let data: string = "";

//loops through rows    
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
                console.log("event is " + event.type);
                // somehow change data based on our thingy
                data += inpEl.value;
                chrome.storage.sync.set({"data": data });
            });

            inpEl.value = data;

            data += inpEl.value;

            // console.log(`inpEl.value is ${inpEl.value}`);
            // chrome.storage.sync.set({key: value});
        }
    }
}
console.log("data is " + data);

chrome.storage.sync.set({"data": data });
chrome.storage.sync.get(["data"]).then((result) => {
    console.log(`Value is currently ${result["data"]}`);
});
