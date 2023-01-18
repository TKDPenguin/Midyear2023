


/*
    TODO:
    - use storage api to store data across google accounts
    - determine a system to structure the table
*/






const table = document.querySelector("table") as HTMLTableElement;

let rowLength = table.rows.length;

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
            alert(elements[0].value);
        }

        /* get your cell info here */
        /* var cellVal = oCells.item(j).innerHTML; */
    }
}