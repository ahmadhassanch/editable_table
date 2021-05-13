function addTable(){
    createTable("table_container");
}

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
        createTable("table_container");
        createTable("table_container");
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
    
    insertRow(){
        var node = getSelectedElement();
        var table = findParentTable(node);
        var row = node.parentNode.rowIndex;
        var new_row = table.insertRow(row+1);
        var siblings = getSiblings(node);

        for (var j=0; j<siblings.length; j++){
            var cell = new_row.insertCell(j);
        }
    }

    insertColumn(){
        var node = getSelectedElement();
        var col = node.cellIndex;
        // var row = node.parentNode.rowIndex;
        var table = findParentTable(node);
        var siblings = getSiblings(node.parentNode); 

        for (var j=0; j<siblings.length; j++){
            var cell = siblings[j].insertCell(col+1);
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


var tableController = new TableController("table_container");



