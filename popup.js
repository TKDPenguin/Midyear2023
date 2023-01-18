var table = document.querySelector("table");
var rowLength = table.rows.length;
var _loop_1 = function (i) {
    //gets cells of current row
    var items = table.rows.item(i);
    var cells = items.cells;
    //gets amount of cells of current row
    var cellLength = cells.length;
    // TODO lets try to handle the button now
    var buttonCell = cells.item(cellLength - 1);
    var buttonVal = buttonCell.getElementsByTagName("button")[0];
    buttonVal.addEventListener("click", function () {
        var element = items.querySelector("p");
        var cellVal = cells.item(cellLength - 3);
        var el = cellVal.getElementsByTagName("input");
        if (el[0] != null) {
            element.textContent = el[0].value;
        }
    });
    //loops through each cell in current row
    for (var j = 0; j < cellLength - 1; j++) {
        var cellVal = cells.item(j);
        var elements = cellVal.getElementsByTagName("input");
        if (elements[0] != null) {
            alert(elements[0].value);
        }
        /* get your cell info here */
        /* var cellVal = oCells.item(j).innerHTML; */
    }
};
//loops through rows    
for (var i = 0; i < rowLength; i++) {
    _loop_1(i);
}
