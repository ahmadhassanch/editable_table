
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

    setBackgoundColor(parent, fore, back){
        var node = getSelectedElement();
        var isAncestor = this.isAncestor(parent, node);

        if ((node == undefined) || (isAncestor == false)){
            console.log("Wrong element selected or no selection");
            return;
        }
        node.style.backgroundColor = back; 
        node.style.color = fore; 
    }
}
