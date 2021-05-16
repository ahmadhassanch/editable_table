
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