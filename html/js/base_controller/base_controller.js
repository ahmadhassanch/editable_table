
class BaseController 
{
    isAncestor(parent, node) {
        while (node) {
            if (node.parentNode === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    desiredNodeNameParent(child, desiredNodeName) {
        let node = child.parentNode;
        while (node) {
            if (node.nodeName === desiredNodeName) {
                return node;
            }
            node = node.parentNode;
        }
        return false;
    }

    getSiblings(e) {
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
    }

    getSelectedElement(){ 
        var selection = window.getSelection();  
        var container = selection.anchorNode; 
     
        if (container == undefined) return undefined;
        if( container.nodeType !== 3 ){
            console.log("Not sure what it is"); 
            return undefined; 
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

    setBackgoundColor(parent, fore, back){
        var node = this.getSelectedElement();
        var isAncestor = this.isAncestor(parent, node);

        if ((node == undefined) || (isAncestor == false)){
            console.log("Wrong element selected or no selection");
            return;
        }
        node.style.backgroundColor = back; 
        node.style.color = fore; 
    }
}
