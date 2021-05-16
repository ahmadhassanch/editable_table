
class MasterController extends BaseController
{
    constructor(container_name){
        super();
        this.container = document.getElementById(container_name);
        // parentsizeChanged is called from 'this' and 'resizer' contexts
        // Need to access 'this' props in resizer context too
        // resizer.cont = this, and this.cont = this -- overcomes the error
        // and can access 'this' in both contexts.        
        this.cont = this; 
        this.observer = new ResizeObserver(this.parentSizeChanged)
        this.observer.observe(this.container);
        this.observer.cont = this;
        this.parentSizeChanged();
        this.saveDict = {data:"No data", containerWidth:"50px"};
        this.insertColsNo = 1;
        this.insertRowsNo = 1;
        this.attachMenu();
        this.tableController = new TableController("table_container");

    }

    showHTML(argument) {
        var data = this.container.innerHTML;
        console.log(data);
        var fontSize = parseFloat(this.cont.container.style.fontSize);
        var exportObj = {data: data, fontSize: fontSize, containerWidth: this.cont.width};
        var jsonData = JSON.stringify(exportObj)
        downloadStringJson(jsonData);
        downloadString(data);
    }

    saveTable(){
        this.saveDict.data = this.container.innerHTML;
        this.saveDict.containerWidth = this.cont.container.offsetWidth;
        this.container.innerHTML = "";
    }
    attachMenu(){
        var children = this.cont.container.children;
        console.log(children.length)
        for (var i = 0; i<children.length; i++){
            var child = children[i]
            console.log(child.nodeName);
            switch(child.nodeName){
                case "TABLE":
                    child.onclick = hideMenuTable;
                    child.oncontextmenu = rightClickTable;
                    break;
                case "P":
                    child.onclick = hideMenuPara;
                    child.oncontextmenu = rightClickPara;
                    break;
            }
        }        
    }

    loadTable(){
        this.container.innerHTML = this.saveDict["data"];
        var savedWidth = this.saveDict["containerWidth"]
        this._sizeChanged(this.container.offsetWidth, savedWidth);
        var fontSize = 
        this.cont.container.style.fontSize = fontSize + "px";
        this.attachMenu();
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
        this.cont.width = width;
    }
    

    setBackgoundColor(fore, back){
        var node = getSelectedElement();
        if ((node == undefined) || (node.nodeName != "TD")){
            console.log("Wrong element selected or no selection");
            return;
        }
        node.style.backgroundColor = back; 
        node.style.color = fore; 
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

        p.onclick = hideMenuPara;
        p.oncontextmenu = rightClickPara;

        table.onclick = hideMenuTable;
        table.oncontextmenu = rightClickTable;

    } 
}
