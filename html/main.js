

var tableController = new TableController("table_container");

function addTable(){
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    tableController.createTable(rows, cols);
}

function setColor(){
    var fore = document.getElementById("forecolor").value;
    var back = document.getElementById("backcolor").value;
    tableController.setBackgoundColor(fore, back);

}

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById(
        "contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document
            .getElementById("contextMenu")
              
        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}

