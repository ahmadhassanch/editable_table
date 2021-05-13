

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

document.onkeydown = function (e) {
    var kc = e.keyCode,
      key = e.key;
    console.log("dn key code: " + kc + ", key: " + e.key);
    var node = getSelectedElement();
    if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
    }
    e.preventDefault();
    var col = node.cellIndex;
    var row = node.parentNode.rowIndex;
    var s = node.previousSibling;
    console.log(s);
    let range = new Range();

    range.setStart(s.firstChild, 0);
    range.setEnd(s.firstChild, s.firstChild.length);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
}
