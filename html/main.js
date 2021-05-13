

var tableController = new TableController("table_container");

function addTable(){
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    tableController.createTable(rows, cols);
}

