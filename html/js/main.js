
const container = document.getElementById("table_container");

var mCont = new MasterController(container);

function addTable(){
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    mCont.createTable(rows, cols);
}

function setColor(){
    var fore = document.getElementById("forecolor").value;
    var back = document.getElementById("backcolor").value;
    mCont.setBackgoundColor(fore, back);
}
