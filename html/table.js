
class TableController
{
    constructor(container_name){
        this.container = document.getElementById(container_name);
        // console.log("container_name", container_name)
        this.cont = this; //first time call to sizeChanged doesn't give error
        this.observer = new ResizeObserver(this.parentSizeChanged)
        this.observer.observe(this.container);
        this.observer.cont = this;
        this.parentSizeChanged();
        this.saveDict = {data:"No data", containerWidth:"50px"};
        this.insertColsNo = 1;
        this.insertRowsNo = 1;
        this.fontScale = 1.0;
    }

    showHTML(argument) {
        var data = this.container.innerHTML;
        console.log(data);
        downloadString({data: data, fontScale: this.fontScale, parentWidth: this.cont.width});
    }
    saveTable(){
        this.saveDict.data = this.container.innerHTML;
        this.saveDict.containerWidth = this.cont.container.offsetWidth;
        this.container.innerHTML = "";
    }

    loadTable(){
        this.container.innerHTML = this.saveDict["data"];
        var savedWidth = this.saveDict["containerWidth"]
        this._sizeChanged(this.container.offsetWidth, savedWidth);
    }

    changeFontSize(scale){
        var previousFontSize = parseFloat(this.cont.container.style.fontSize);
        this.cont.container.style.fontSize = scale*previousFontSize+"px";
    }

    _sizeChanged(newWidth, oldWidth){

        var previousFontSize = parseFloat(this.cont.container.style.fontSize);
        this.cont.container.style.fontSize = previousFontSize*newWidth/oldWidth+"px";
        var tables = this.cont.container.getElementsByTagName("TABLE");

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

    parentSizeChanged() {
        var width = this.cont.container.offsetWidth;
        var tables = this.cont.container.getElementsByTagName("TABLE");

        this.cont._sizeChanged(width, this.cont.width);
        // this.width = width;
        this.cont.width = width;
        // console.log("size changed", width)
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
        var row = node.parentNode.rowIndex;
        var table = findParentTable(node);
        var new_row = table.insertRow(row+aboveOrBelow);
        // var rowSiblings = getSiblings(node.parentNode);

        var row = table.getElementsByTagName("tr")[0];
        var cells = row.getElementsByTagName("td");

        for (var j=0; j<cells.length; j++){
            var cell = new_row.insertCell(j);
            cell.innerHTML = this.insertRowsNo;
            // if sizingRow then need to set width cell.style.width = "100px";
            //should not occur
        }
    }

    deleteRow(){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        var table = findParentTable(node);
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
        var table = findParentTable(node);
        var trs = getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){
            var cell = trs[j].insertCell(col+beforeOrAfter);
            if (j==0){
                cell.style.width = "100px";
            }
            else{
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
        var table = findParentTable(node);
        var trs = getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){
            // var cell = trs[j].deleteCell(col);
            
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
        console.log("nextSpan", nextSpan)
        if (nextSpan == null) nextSpan = 1;

        node.setAttribute("colspan",  parseInt(currentSpan)+parseInt(nextSpan));
        var w1 = parseFloat(node.style.width);
        console.log(row, col); 
        console.log("row, col", row, col)
        console.log("nextSibling", node);

        // var previousSpan = node.getAttribute("colspan");

        // var w2 = parseFloat(node.nextSibling.style.width);
        // node.style.width = w1+w2+'px';
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
        if(row == 0)  //first row is the resizing row, we don't want to delete cells
            return;

        var col = node.cellIndex;
        var previousSpan = node.getAttribute("colspan");
        if ((previousSpan == null) || (previousSpan ==1))
            return;

        console.log(previousSpan);
        node.setAttribute("colspan", parseInt(previousSpan)-1);
        var cell = node.parentNode.insertCell(col+1);
    }

    setBackgoundColor(fore, back){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        node.style.backgroundColor = back; 
        node.style.color = fore; 
        var siblings = getSiblings(node);
        console.log(siblings.length);
    }

    createTable(rows, cols){ 
        var div = this.container;

        var p = document.createElement("p");
        div.appendChild(p);
        p.innerHTML = "Text before Table"

        var table = document.createElement("TABLE");
        div.appendChild(table);

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
        div.appendChild(p);
        p.innerHTML = "Text after Table"
    } 
}


// downloadString("This is a sting2", "text/csv", "myCSV.csv")

