


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

function downloadStringJson(exportObj){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download",  "000.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function downloadString1(text) {
  var fileName = "aaa/000.html";
  // var json = JSON.stringify(text)
  // console.log(json);
  var blob = new Blob(text);

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text", a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

function downloadString(text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', "000.html");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}