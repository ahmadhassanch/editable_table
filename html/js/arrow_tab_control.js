// shiftStatus = false;

// document.onkeyup = function (e) {if (e.key == "Shift") shiftStatus = false;}

// function handleArrowKey(e, offset){
//     var node = mCont.tableController.getSelectedElement();
//     if ((node == undefined) || (node.nodeName != "TD")){
//         console.log("Wrong element selected or no selection");
//         return;
//     }
     
//     var colIndex = node.cellIndex;
//     var rowIndex = node.parentNode.rowIndex;
//     // handle the case when we are in the top row and w
//     // want to switch to previous contenteditable.
//     if ((rowIndex == 1) &&  (offset == -1)) return;    

//     // TODO: handle the last row case
//     // Move to the next editable even if we are in the first column
 
//     var s = mCont.getSiblings(node.parentNode)[rowIndex+offset];
//     if (s==undefined) {
//         console.log("return 2");
//         return;
//     }
//     var sibs = mCont.getSiblings(s.firstChild);

//     if (colIndex > sibs.length)
//         colIndex = sibs.length - 1;
//     s = sibs[colIndex];

//     // Get the previous selected range, and select the same range in new cell
//     var selection = window.getSelection();  
//     var range1 = selection.getRangeAt(0);
//     let range = new Range();
//     range.setStart(s.firstChild, Math.min(range1.endOffset, s.firstChild.length));
//     range.setEnd(s.firstChild, Math.min(range1.endOffset, s.firstChild.length));
//     window.getSelection().removeAllRanges();
//     window.getSelection().addRange(range);
//     e.preventDefault(); 
// }

// function handleTabKey(e){
//     var node = mCont.tableController.getSelectedElement();
//     if ((node == undefined) || (node.nodeName != "TD")){
//         console.log("Wrong element selected or no selection");
//         return;
//     }
    
//     if (shiftStatus == true){
//         var s = node.previousSibling;
//         if (s==null)
//             s = node.parentNode.previousSibling.lastChild;
//     }

//     if (shiftStatus == false){
//         var s = node.nextSibling;
//         if (s==null)
//             s = node.parentNode.nextSibling.firstChild;
//     }
//     let range = new Range();
//     range.setStart(s.firstChild, 0);
//     range.setEnd(s.firstChild, s.firstChild.length);
//     window.getSelection().removeAllRanges();
//     window.getSelection().addRange(range);
//     e.preventDefault();  
// }

// document.onkeydown = function (e) {
//     var kc = e.keyCode,
//     key = e.key;
//     // var qq = document.querySelectorAll('[contenteditable]=true');
//     // console.log(qq);
//     // document.getElementById("table_container").focus();
//     // e.preventDefault();
//     // return;
//     switch(e.key){
//         case "Shift": 
//             shiftStatus = true; 
//             return; 

//         case "Tab": 
//             handleTabKey(e);
//             return; 

//         case "ArrowDown": 
//             handleArrowKey(e, 1);  
//             return;

//         case "ArrowUp": 
//             handleArrowKey(e, -1);
//             return;
//     }
// }
