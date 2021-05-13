
function createTable(table_container){ 
    console.log("creating   ")
    var div = document.getElementById(table_container);
    
    var p = document.createElement("p");
    div.appendChild(p);
    p.innerHTML = "Adding new table"

    var table = document.createElement("TABLE");
    div.appendChild(table);

    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;
    console.log(rows);

    //console.log(parseInt(rows) + parseInt(cols));
    for (i=0;i<rows;i++){
        // Create an empty <tr> element and add at ith position
        var row = table.insertRow(i);

        for (j=0; j<cols; j++){
            // Insert new cells (<td> elements) 
            var cell = row.insertCell(j);
            // cell.innerHTML = "cell:" + i + " " + j;
        }
    }

} 



