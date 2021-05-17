shiftStatus = false;

document.onkeyup = function (e) {if (e.key == "Shift") shiftStatus = false;}

function handleTabKey(e){
    var node = mCont.tableController.getSelectedElement();
    if ((node == undefined) || (node.nodeName != "TD")){
        console.log("Wrong element selected or no selection");
        return;
    }

    if (shiftStatus == true){
        var s = node.previousSibling;
        if (s==null)
            s = node.parentNode.previousSibling.lastChild;
    }

    if (shiftStatus == false){
        var s = node.nextSibling;
        if (s==null)
            s = node.parentNode.nextSibling.firstChild;
    }
    let range = new Range();
    range.setStart(s.firstChild, 0);
    range.setEnd(s.firstChild, s.firstChild.length);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    e.preventDefault();    
}

document.onkeydown = function (e) {
    var kc = e.keyCode,
    key = e.key;
    console.log("dn key code: " + kc + ", key: " + e.key);

    if (e.key == "Shift"){ 
        shiftStatus = true; 
        return; 
    }
    
    if (e.key == "Tab"){
        handleTabKey(e);
        return;
    }
    // var col = node.cellIndex;
    // var row = node.parentNode.rowIndex;
}

// var selection = window.getSelection();  
// var range1 = selection.getRangeAt(0);

// console.log(range1, range1.startOffset, range1.endOffset);
// let range = new Range();

// range.setStart(s.firstChild, 0);
// range.setEnd(s.firstChild, s.firstChild.length);

// window.getSelection().removeAllRanges();
// window.getSelection().addRange(range);
