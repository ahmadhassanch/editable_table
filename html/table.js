
class TableController
{
    constructor(container_name){
        this.container = document.getElementById(container_name);
        this.cont = this; //first time call to sizeChanged doesn't give error
        this.observer = new ResizeObserver(this.parentSizeChanged)
        this.observer.observe(this.container);
        this.observer.cont = this;
        this.parentSizeChanged();
        this.saveDict = {data:"No data", containerWidth:"50px"};
    }

    showHTML(argument) {
        console.log(this.container.innerHTML);
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

    _sizeChanged(newWidth, oldWidth){
        this.cont.container.style.fontSize = .025*newWidth+"px";
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

        this.cont._sizeChanged(width, this.width);
        this.width = width;
    }
    
    // get the selected td and find the row_no which has the cursor. Find the 
    // parent table, and insert another row in that table below current one
    insertRow(){
        var node = getSelectedElement();
        var row = node.parentNode.rowIndex;
        var table = findParentTable(node);
        var new_row = table.insertRow(row+1);
        var siblings = getSiblings(node);

        for (var j=0; j<siblings.length; j++){
            var cell = new_row.insertCell(j);
            if ( row+1 ==0)cell.style.width = "100px";
        }
    }

    // get the col_no via cellIndex. Now get the parent TR and all of its siblings.
    // Now insert another column in that table right to current one
    mergeCells(){
        var node = getSelectedElement();
        var row = node.parentNode.rowIndex;
        var col = node.cellIndex;
        console.log(row, col); 
        if (row == 0)
            node.parentNode.deleteCell(col);
        // var table = findParentTable(node);
        // var trs = getSiblings(node.parentNode); 

        // for (var j=0; j<trs.length; j++){
        //     var cell = trs[j].insertCell(col+1);
        //     if (j==0)cell.style.width = "100px";
        // }
    }

    
    insertColumn(){
        var node = getSelectedElement();
        var col = node.cellIndex;
        var table = findParentTable(node);
        var trs = getSiblings(node.parentNode); 

        for (var j=0; j<trs.length; j++){
            var cell = trs[j].insertCell(col+1);
            if (j==0)cell.style.width = "100px";
        }

    }

    setBackgoundColor(){
        var node = getSelectedElement();
        node.style.backgroundColor = "gray"; 
        node.style.color = "red"; 
        var siblings = getSiblings(node);
        console.log(siblings.length);
    }

    createTable(rows, cols){ 
        console.log("creating")
        var div = this.container;

        var p = document.createElement("p");
        div.appendChild(p);
        p.innerHTML = "Adding new table"

        var table = document.createElement("TABLE");
        div.appendChild(table);

        for (var i=0;i<rows;i++){
            var row = table.insertRow(i);
            for (var j=0; j<cols; j++){
                var cell = row.insertCell(j);
                cell.innerHTML = "cell: " + i + " " + j;
                if (i == 0)
                    cell.style.width = "100px";
            }
        }
    } 
}

