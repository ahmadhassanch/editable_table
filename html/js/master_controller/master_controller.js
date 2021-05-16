
/*
    There should be just one Master Controller. Right now no plans
    of having multiple Master Controllers.

    Each MasterController will control the div with name 'container_name'
    MasterController will have immediate children which it will control
    via appropriate Table, Para, ... Controllers.

    MasterController will also observe resizing of 'container_name' and

*/

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
        this.tableController = new TableController("table_container");
        this.parentSizeChanged();
        this.saveDict = {data:"No data", containerWidth:"50px"};
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
        this.tableController.resizeTables(tables, newWidth, oldWidth);
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

    downloadStringJson(exportObj){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download",  "000.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    downloadString(text) {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', "000.html");
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
    }
}
