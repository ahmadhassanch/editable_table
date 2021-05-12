function addTable(){
    createTable("table_container");
}
function getSelectedElement(){ 
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
        var col = container.parentNode.cellIndex;
        var row = container.parentNode.parentNode.rowIndex;
        console.log("row, col", row, col)

        container.parentNode.style.backgroundColor = "gray"; 
        container.parentNode.style.color = "red"; 

        var range = selection.getRangeAt(0);
        var ulTag = range.commonAncestorContainer;
        console.log("common ", ulTag);
        if (ulTag)
            ulTag.style.backgroundColor = "gray"; 
        return container.parentNode 
    } 
} 


function setBackgroundColor(){
    var node = getSelectedElement();

}




