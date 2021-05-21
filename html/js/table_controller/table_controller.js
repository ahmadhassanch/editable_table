
class TableController extends BaseController
{
    constructor(container){
        super(container);
        this.insertColsNo = 1;
        this.insertRowsNo = 1;
        this.shiftStatus = false;
        this.tableCount = 1;
        
        document.onkeyup = (e) => {if (e.key == "Shift") this.shiftStatus = false;}
        document.onkeydown = (e) => {
            switch(e.key){
                case "Shift": 
                    this.shiftStatus = true; 
                    return; 
        
                case "Tab": 
                    this.handleTabKey(e);
                    return; 
        
                case "ArrowDown": 
                    this.handleArrowKey(e, 1);  
                    return;
        
                case "ArrowUp": 
                    this.handleArrowKey(e, -1);
                    return;
            }
        };

        this.createNodes();
    }

    createNodes() {  
        console.log('Setting Context Menu');      
        const ctxHTML = `
            <div id="contextMenuTable" class="context-menu" style="display:none" contenteditable="false">
                <ul>
                    <li>
                        <button id="row_above">Insert row above</button>
                    </li>
                    <li>
                        <button id="row_below">Insert row below</button>
                    </li>
                    <li>
                        <button id="col_before">Insert column before</button>
                    </li>
                    <li>
                        <button id="col_after">Insert column after</button>
                    </li>
                    <li>
                        <button id="delete_row">Delete row</button>
                    </li>
                    <li>
                        <button id="delete_col">Delete column</button>
                    </li>
                    <li>
                        <button id="merge_cells">Merge Cells</button>
                    </li>
                    <li>
                        <button id="split_cells">Split Cells</button>
                    </li>
                </ul>
            </div>

            <div id="contextMenuPara" class="context-menu" style="display:none" contenteditable="false">
                <ul>
                    <li>
                        <button id="row_above">Insert row above</button>
                    </li>
                    <li>
                        <button id="row_below">Insert row below</button>
                    </li>

                </ul>
            </div>
        `;

        this.parentContainer.innerHTML += ctxHTML;

        setTimeout(() => {
            this.setButtonListeners();
        }, 10);
    }

    setButtonListeners() {
        const rowAboveBtn = document.getElementById('row_above');
        rowAboveBtn.onclick = (e) => this.insertRow(0);

        const rowBelowBtn = document.getElementById('row_below');
        rowBelowBtn.onclick = (e) => this.insertRow(1);

        const colBeforeBtn = document.getElementById('col_before');
        colBeforeBtn.onclick = (e) => this.insertColumn(0);

        const colAfterBtn = document.getElementById('col_after');
        colAfterBtn.onclick = (e) => this.insertColumn(1);

        const mergeCellsBtn = document.getElementById('merge_cells');
        mergeCellsBtn.onclick = (e) => this.mergeCells();

        const splitCellBtn = document.getElementById('split_cells');
        splitCellBtn.onclick = (e) => this.splitCell();

        const deleteRowBtn = document.getElementById('delete_row');
        deleteRowBtn.onclick = (e) => this.deleteRow();

        const deleteColBtn = document.getElementById('delete_col');
        deleteColBtn.onclick = (e) => this.deleteColumn();
    }

    resizeTables(tables, newWidth, oldWidth){
        this.hideMenus();
        for (var k=0; k<tables.length; k++){
           
            var table = tables[k];
            var row = table.getElementsByTagName("tr")[0];
            var cells = row.getElementsByTagName("td");

            for(var i = 0; i < cells.length; i++){
                var v = parseFloat(cells[i].style.width);
                cells[i].style.width = v*newWidth/oldWidth + "px";
            }
        }

    }
    // get the selected td and find the row_no which has the cursor. Find the 
    // parent table, and insert another row in that table below current one
    insertRow(aboveOrBelow){
        this.hideMenus();

        var node = this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        this.insertRowsNo += 1;
        var table = this.desiredNodeNameParent(node, "TABLE");
        var c = node.cellIndex;
        var r = node.parentNode.rowIndex;
        // console.log("r,c", r, c, aboveOrBelow);
        // console.log("table", table);

        var new_row = table.insertRow(r+aboveOrBelow);
        var row = table.getElementsByTagName("tr")[0];
        var cells = row.getElementsByTagName("td");
        // console.log(row, cells, aboveOrBelow);

        for (var j=0; j<cells.length; j++){
            var cell = new_row.insertCell(j);
            //TODO: remove this, currently for debugging
            cell.innerHTML = this.insertRowsNo; 
        }
    }

    deleteRow(){
        this.hideMenus();

        var node = this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        var table = this.desiredNodeNameParent(node, "TABLE");
        var row = node.parentNode.rowIndex;
        table.deleteRow(row);
    }
    
    insertColumn(beforeOrAfter){
        this.hideMenus();

        var node = this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        this.insertColsNo += 1;
        var col = node.cellIndex;
        var row = node.parentNode.rowIndex;
        console.log("r,c", row, col, beforeOrAfter);
        var table = this.desiredNodeNameParent(node, "TABLE");
        var trs = this.getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){
            console.log(j);
            var tds = trs[j].getElementsByTagName("td")
            var tPosition = col+beforeOrAfter;
            if (tPosition > tds.length) 
                continue;
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
        this.hideMenus();

        var node = this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        this.insertColsNo += 1;
        var col = node.cellIndex;
        var table = this.desiredNodeNameParent(node, "TABLE");
        var trs = this.getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){

            var cells = trs[j].getElementsByTagName("td");
            if (col > cells.length -1) continue;
            var previousSpan = cells[col].getAttribute("colspan");
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
        this.hideMenus();

        console.log("mergeCells Called");
        var node = this.getSelectedElement();
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

        var siblings = this.getSiblings(node);
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
        this.hideMenus();

        console.log("splitCell Called");
        var node = this.getSelectedElement();
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
        p.innerHTML = "Text before Table" + this.tableCount;

        var table = document.createElement("TABLE");
        table.classList.add('editable-table');
        parent.appendChild(table);

        for (var i=0; i<rows; i++){
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
        p.innerHTML = "Text after Table" + this.tableCount;
        this.tableCount += 1;

        p.onclick = (e) => this.hideMenuPara(e);
        p.oncontextmenu = (e) => this.rightClickPara(e);

        table.onclick = (e) => this.hideMenuTable(e);
        table.oncontextmenu = (e) => this.rightClickTable(e);
    } 

    deleteTable(){
        var node = this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        var table = this.desiredNodeNameParent(node, "TABLE");        
        table.remove();
    }

    handleArrowKey(e, offset){
        var node = this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
         
        var colIndex = node.cellIndex;
        var rowIndex = node.parentNode.rowIndex;
        // handle the case when we are in the top row and w
        // want to switch to previous contenteditable.
        if ((rowIndex == 1) &&  (offset == -1)) return;    
    
        // TODO: handle the last row case
        // Move to the next editable even if we are in the first column
     
        var s = this.getSiblings(node.parentNode)[rowIndex+offset];
        if (s==undefined) {
            console.log("return 2");
            return;
        }
        var sibs = this.getSiblings(s.firstChild);
    
        if (colIndex > sibs.length)
            colIndex = sibs.length - 1;
        s = sibs[colIndex];
    
        // Get the previous selected range, and select the same range in new cell
        var selection = window.getSelection();  
        var range1 = selection.getRangeAt(0);
        let range = new Range();
        range.setStart(s.firstChild, Math.min(range1.endOffset, s.firstChild.length));
        range.setEnd(s.firstChild, Math.min(range1.endOffset, s.firstChild.length));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        e.preventDefault(); 
    }
    
    handleTabKey(e){
        var node =this.getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        
        if (this.shiftStatus == true){
            var s = node.previousSibling;
            if (s==null)
                s = node.parentNode.previousSibling.lastChild;
        }
    
        if (this.shiftStatus == false){
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
}
