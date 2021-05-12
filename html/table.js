function addTable(){
    createTable("table_container");
}


class TableController
{
    constructor(container_name){
        this.table_cont = document.getElementById(container_name);

        this.observer = new ResizeObserver(this.outputsize)
        this.observer.observe(this.table_cont);
        
        this.observer.table_cont = this.table_cont;
        this.outputsize();
    }

    showHTML(argument) {
        console.log(this.table_cont.innerHTML);
    }


    outputsize() {
        var width = this.table_cont.offsetWidth;
        var height = this.table_cont.offsetHeight;
        // console.log(width, height);

        // TODO: have to get array of all tables and elements in this div
        // so that all can be resized
        // since we may have created more than one table
        
        var table = document.getElementById("dynamic_table");
        table.style.fontSize = .025*width+"px";
        this.table_cont.style.fontSize = .025*width+"px";
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
        var row = node.parentNode.rowIndex;
        // console.log("row, col", row, col)
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



