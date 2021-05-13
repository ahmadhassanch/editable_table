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
        
        this.observer = new ResizeObserver(this.outputsize)
        this.observer.observe(this.container);
        
        // this.observer.container = this.container;
        this.observer.cont = this;

        this.width = -1;
        this.outputsize();
        createTable("table_container");
    }

    showHTML(argument) {
        console.log(this.container.innerHTML);
    }

    _changeWidths(wnew, wold){
        console.log("change widths===========", wnew, wold);
        var table = document.getElementById("dynamic_table");
        var d = table.getElementsByTagName("tr")[0];
        var r = d.getElementsByTagName("td");
        // var nw = w/r.length;
        
        var sum = 0;

        for(var i = 0; i < r.length; i++){
            // console.log("x", r[i].style.width);
            var v = parseFloat(r[i].style.width);
            sum += v;
            // console.log("sum", v, sum);

        }
        //223, 109, 646
        // console.log("sumxx", sum, sum/w);

        for(var i = 0; i < r.length; i++){
            var v = parseFloat(r[i].style.width);
            // console.log("frac", i, v*1.0/sum);
            
            r[i].style.width = v*1.0*wnew/wold + "px";
        }
    }

    outputsize() {
        var width = this.cont.container.offsetWidth;
        var height = this.cont.container.offsetHeight;

        if (this.width != -1) 
            this.cont._changeWidths(width, this.width);

        this.width = width;
        console.log("out width", this.width);
        // TODO: have to get array of all tables and elements in this div
        // so that all can be resized
        // since we may have created more than one table
        
        var table = document.getElementById("dynamic_table");
        table.style.fontSize = .025*width+"px";
        this.cont.container.style.fontSize = .025*width+"px";
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



