function getElementIndex(node) {
    var index = 0;
    while ( (node = node.previousElementSibling) ) {
        index++;
    }
    return index;
}  

function getSelectionElement(){ 
    var selection = window.getSelection();  
    var container = selection.anchorNode; 
 
    if( container.nodeType !== 3 ){
        console.log("Not sure what it is"); 
        return container; 
    } 
    else{ 
        // return parent if text node
        console.log(selection)

        console.log(container)
        console.log(container.parentNode);
        console.log("index",getElementIndex(container.parentNode))

        console.log("index",getElementIndex(container.parentNode.parentNode))
        var col = container.parentNode.cellIndex;
        var row = container.parentNode.parentNode.rowIndex;
        console.log("row, col", row, col)

        container.parentNode.style.backgroundColor = "gray"; 

        var range = selection.getRangeAt(0);
        var ulTag = range.commonAncestorContainer;
        console.log("common ", ulTag);
        if (ulTag)
            ulTag.style.backgroundColor = "gray"; 
        return container.parentNode 
    } 
} 
