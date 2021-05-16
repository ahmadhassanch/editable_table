
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
        this.attachMenu();
        this.tableController = new TableController("table_container");
    }

    showData(argument) {
        var data = this.container.innerHTML;
        console.log(data);
        var fontSize = parseFloat(this.cont.container.style.fontSize);
        var exportObj = {data: data, fontSize: fontSize, containerWidth: this.cont.width};
        var jsonData = JSON.stringify(exportObj)
        downloadStringJson(jsonData);
        downloadString(data);
    }

    saveData(){
        this.saveDict.data = this.container.innerHTML;
        this.saveDict.containerWidth = this.cont.container.offsetWidth;
        this.container.innerHTML = "";
    }

    loadData(){
        this.container.innerHTML = this.saveDict["data"];
        var savedWidth = this.saveDict["containerWidth"]
        this._sizeChanged(this.container.offsetWidth, savedWidth);
        var fontSize = this.cont.container.style.fontSize = fontSize + "px";
        this.attachMenu();
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

    createTable(rows, cols){ 
        var div = this.container;
        this.tableController.createTable(div, this.cont.width, rows, cols);
    } 
}
