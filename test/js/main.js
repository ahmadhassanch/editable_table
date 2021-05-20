

var els = document.getElementsByTagName('TD');
console.log(els);

for (var i=0;i<els.length;i++)
{
    els[i].oncontextmenu = function(e){
    e.preventDefault();    
    console.log(e.target);

    }    
}


function toggleMenu(e){
    var contextMenu = document.getElementById("context-menu");
    console.log(contextMenu);
    console.log("before", contextMenu.style.display);
    if(contextMenu.style.display == 'none')
        contextMenu.style.display = 'block'
    else
        (contextMenu.style.display = 'none')
    console.log("after", contextMenu.style.display);
}