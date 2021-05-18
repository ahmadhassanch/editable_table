
class BaseController 
{
    constructor(container_name){
        this.parentContainer = document.getElementById(container_name);
    }

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

    setBackgoundColor(fore, back){
        var els = this.getSelectedElements();
        for (var i=0; i< els.length; i++) {
            var el = els[i];
            el.style.backgroundColor = back; 
            el.style.color = fore; 
        }
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
            return container.parentNode 
        } 
    } 

    getSelectedElements(){
        var node = this.getSelectedElement();
        var isAncestor = this.isAncestor(this.parentContainer, node);

        if ((node == undefined) || (isAncestor == false)){
            console.log("Wrong element selected or no selection");
            return;
        }

        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        // only one element selected
        if (range.startOffset == range.endOffset){
            return [node];
        }

        // Multiple elements selected
        var ancestor = range.commonAncestorContainer;
        var allWithinRangeParent = ancestor.getElementsByTagName("*");
        var allSelected = [];
        for (var i=0; i< allWithinRangeParent.length; i++) {
          var el = allWithinRangeParent[i];
          // The second parameter says to include the element 
          // even if it's not fully selected
          if (selection.containsNode(el, true) ) {
            allSelected.push(el);
          }
        }
        return allSelected;
    }
}
