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

function hideMenuTable() {
    const elem = document.getElementById("contextMenuTable");
    if (elem)
    {
        elem.style.display = "none";
    }
}

function rightClickTable(e) {
    hideMenus();
    e.preventDefault();

    if (document.getElementById(
        "contextMenuTable").style.display == "block")
        hideMenu();
    else {
        var menu = document
            .getElementById("contextMenuTable")
        
        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}

function hideMenuPara() {
    const elem = document.getElementById("contextMenuPara");
    if (elem)
    {
        elem.style.display = "none";
    }
}

function rightClickPara(e) {
    hideMenus();
    e.preventDefault();

    if (document.getElementById("contextMenuPara").style.display == "block")
        hideMenu();
    else {
    var menu = document.getElementById("contextMenuPara")
            
    menu.style.display = 'block';
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    }
}

function hideMenus(){
    hideMenuPara();
    hideMenuTable();
}
document.addEventListener('click', hideMenus)