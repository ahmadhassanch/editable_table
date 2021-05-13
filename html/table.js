
class TableController
{
    constructor(container_name){
        this.container = document.getElementById(container_name);

        this.cont = this; //first time outputsize() will be called from this context
                          //afterwards from observer context. 
                          //so first time it won't give error
        
        this.observer = new ResizeObserver(this.sizeChanged)
        this.observer.observe(this.container);
        this.observer.cont = this;
        this.sizeChanged();
       
    }

    showHTML(argument) {
        console.log(this.container.innerHTML);
    }

    sizeChanged() {
        var width = this.cont.container.offsetWidth;
        var tables = this.cont.container.getElementsByTagName("TABLE");

        this.cont.container.style.fontSize = .025*width+"px";
        for (var k=0; k<tables.length; k++){
           
            var table = tables[k];
            var row = table.getElementsByTagName("tr")[0];
            var cells = row.getElementsByTagName("td");

            for(var i = 0; i < cells.length; i++){
                var v = parseFloat(cells[i].style.width);
                cells[i].style.width = v*width/this.width + "px";
            }
        }
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
}



