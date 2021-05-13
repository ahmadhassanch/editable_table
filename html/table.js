function addTable(){
    createTable("table_container");
}


class TableController
{
    constructor(container_name){
        this.table_cont = document.getElementById(container_name);
        this.table_cont.cont = this;
        this.observer = new ResizeObserver(this.outputsize)
        this.observer.observe(this.table_cont);
        
        this.observer.table_cont = this.table_cont;

        this.width = -1;
        this.outputsize();
        createTable("table_container");
    }

    showHTML(argument) {
        console.log(this.table_cont.innerHTML);
    }

    _changeWidths(w){
        console.log("change widths");
        var table = document.getElementById("dynamic_table");
        var d = table.getElementsByTagName("tr")[0];
        var r = d.getElementsByTagName("td");
        

        var nw = w/r.length;
        
        // console.log("width", this.width, nw);

        for(var i = 0; i < r.length; i++){
            console.log(r[i]);
            r[i].style.width = nw + "px";
        }
        
    }

    outputsize() {
        var width = this.table_cont.offsetWidth;
        var height = this.table_cont.offsetHeight;

        if (this.width != -1) 
            this.table_cont.cont._changeWidths(width);

        // this.
        this.width = width;
        console.log("out width", this.width);
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



