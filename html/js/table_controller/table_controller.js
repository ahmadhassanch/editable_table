
class TableController extends BaseController
{
    constructor(){
        super();
        this.insertColsNo = 1;
        this.insertRowsNo = 1;
    }

    findParentTable(child) {
        let node = child.parentNode;
        while (node) {
            if (node.nodeName === "TABLE") {
                return node;
            }
            node = node.parentNode;
        }
        return false;
    }

    // get the selected td and find the row_no which has the cursor. Find the 
    // parent table, and insert another row in that table below current one
    insertRow(aboveOrBelow){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        this.insertRowsNo += 1;
        var table = this.findParentTable(node);
        var new_row = table.insertRow(row+aboveOrBelow);
        var row = table.getElementsByTagName("tr")[0];
        var cells = row.getElementsByTagName("td");
        console.log(row, cells);

        for (var j=0; j<cells.length; j++){
            var cell = new_row.insertCell(j);
            //TODO: remove this, currently for debugging
            cell.innerHTML = this.insertRowsNo; 
        }
    }

    deleteRow(){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        var table = this.findParentTable(node);
        var row = node.parentNode.rowIndex;
        table.deleteRow(row);
    }
    
    insertColumn(beforeOrAfter){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        this.insertColsNo += 1;
        var col = node.cellIndex;
        var row = node.parentNode.rowIndex;
        console.log("r,c", row, col, beforeOrAfter);
        var table = this.findParentTable(node);
        var trs = getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){
            console.log(j);
            var tds = trs[j].getElementsByTagName("td")
            var tPosition = col+beforeOrAfter;
            if (tPosition > tds.length) 
                tPosition = tds.length
            var cell = trs[j].insertCell(tPosition);
            if (j==0){
                //TODO: Fix the new column insert size
                cell.style.width = "100px";
            }
            else{
                //TODO: remove this, currently for debugging
                cell.innerHTML = this.insertColsNo;
            }
        }
    }

    deleteColumn(){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        this.insertColsNo += 1;
        var col = node.cellIndex;
        var table = this.findParentTable(node);
        var trs = getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){

            var cells = trs[j].getElementsByTagName("td");
            if (col > cells.length-1)
                col = cells.length -1;
            var previousSpan = cells[col].getAttribute("colspan");
            console.log(j, previousSpan);
            if ((previousSpan == null) || (previousSpan == 1)){
                previousSpan = 1;
                var cell = trs[j].deleteCell(col);
            }
            else{
                cells[col].setAttribute("colspan", parseInt(previousSpan)-1);
            }
        }
    }

    // get the col_no via cellIndex. Now get the parent TR and all of its siblings.
    // Now insert another column in that table right to current one
    mergeCells(){
        console.log("mergeCells Called");
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        var row = node.parentNode.rowIndex;
        if(row == 0)  //first row is the resizing row, we don't want to delete cells
            return;

        var col = node.cellIndex;
        var currentSpan = node.getAttribute("colspan");
        console.log("previousSpan", currentSpan);
        if (currentSpan == null)
            currentSpan = 1;

        var siblings = getSiblings(node);
        var nextSibling = siblings[col+1];
        // Last column can't merge
        if (nextSibling == null)
            return;
        var nextSpan =  nextSibling.getAttribute("colspan")
        if (nextSpan == null) nextSpan = 1;

        node.setAttribute("colspan",  parseInt(currentSpan)+parseInt(nextSpan));
        node.parentNode.deleteCell(col+1);
    }

    splitCell(){
        console.log("splitCell Called");
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        var row = node.parentNode.rowIndex;
        if(row == 0)  //first row is the resizing row, don't touch it
            return;

        var col = node.cellIndex;
        var previousSpan = node.getAttribute("colspan");
        if ((previousSpan == null) || (previousSpan ==1))
            return;

        console.log(previousSpan);
        node.setAttribute("colspan", parseInt(previousSpan)-1);
        var cell = node.parentNode.insertCell(col+1);
    }

    createTable(parent, width, rows, cols){
        this.width = width; 
        var p = document.createElement("p");
        parent.appendChild(p);
        p.innerHTML = "Text before Table"

        var table = document.createElement("TABLE");
        parent.appendChild(table);

        for (var i=0;i<rows;i++){
            var row = table.insertRow(i);
            if(i==0)
                row.setAttribute("contenteditable", "false");
            for (var j=0; j<cols; j++){
                var cell = row.insertCell(j);
                if (i == 0){
                    cell.style.width = this.width/cols+"px";
                    cell.innerHTML = "<p></p>";
                }
                else
                {
                    cell.innerHTML = "cell: " + i + " " + j;
                }
            }
        }
        var p = document.createElement("p");
        parent.appendChild(p);
        p.innerHTML = "Text after Table"

        p.onclick = hideMenuPara;
        p.oncontextmenu = rightClickPara;

        table.onclick = hideMenuTable;
        table.oncontextmenu = rightClickTable;
    } 
}
