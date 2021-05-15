

function findParentTable(child) {
    let node = child.parentNode;
    while (node) {
        if (node.nodeName === "TABLE") {
            return node;
        }
        // Traverse up to the parent
        node = node.parentNode;
    }

    // Go up until the root but couldn't find the `parent`
    return false;
}

function getSelectedElement(){ 
    var selection = window.getSelection();  
    var container = selection.anchorNode; 
 
    if (container == undefined) return;
    if( container.nodeType !== 3 ){
        console.log("Not sure what it is"); 
        return container; 
    } 
    else{ 
        // return parent if text node
        // console.log(selection)

        // console.log(container)
        // console.log(container.parentNode);
        // var col = container.parentNode.cellIndex;
        // var row = container.parentNode.parentNode.rowIndex;
        // console.log("row, col", row, col)

        // container.parentNode.style.backgroundColor = "gray"; 
        // container.parentNode.style.color = "red"; 

        // var range = selection.getRangeAt(0);
        // var ulTag = range.commonAncestorContainer;
        // console.log("common ", ulTag);
        // if (ulTag)
        //     ulTag.style.backgroundColor = "gray"; 
        return container.parentNode 
    } 
} 

function getSiblings(e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 /*&& sibling !== e*/) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

function downloadString(exportObj){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download",  "file.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function downloadString1(text) {
  var fileName = "tableData.json";
  var json = JSON.stringify(text)
  console.log(json);
  var blob = new Blob(json, {type:'text'});

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ["json", a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}
