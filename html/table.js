function addTable(){
    createTable("table_container");
}

function showHTML(argument) {
    var x = document.getElementById("table_container");
    var text = x.innerHTML;
    console.log(text);
}

function setBackgoundColor(){
    var node = getSelectedElement();
    node.style.backgroundColor = "gray"; 
    node.style.color = "red"; 

    var siblings = getSiblings(node);
    console.log(siblings.length);



}

function insertColumn(){
    var node = getSelectedElement();
    var col = node.cellIndex;
    var row = node.parentNode.rowIndex;
    console.log("row, col", row, col)
    var table = document.getElementById("dynamic_table");
    console.log(table);
    console.log(node);
    console.log(node.parentNode);
    var siblings = getSiblings(node.parentNode); 

    for (j=0; j<siblings.length; j++){
        var cell = siblings[j].insertCell(col+1);
    }
}


function insertRow(){
    var node = getSelectedElement();
    var row = node.parentNode.rowIndex;
    var table = document.getElementById("dynamic_table");
    var new_row = table.insertRow(row+1);
    var siblings = getSiblings(node);

    for (j=0; j<siblings.length; j++){
        var cell = new_row.insertCell(j);
    }
}

var table_cont = document.getElementById("table_container");

function outputsize() {
    var width = table_cont.offsetWidth;
    var height = table_cont.offsetHeight;
    console.log(width, height);

    var table = document.getElementById("dynamic_table");
    table.style.fontSize = .05*width+"px";

}
outputsize()

new ResizeObserver(outputsize).observe(table_cont);



