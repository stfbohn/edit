function mousemove(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    //console.log(coor);
    document.getElementById("coord").innerHTML = coor;
}

function clearCoor() {
    //console.log('out');
    document.getElementById("coord").innerHTML = "out";
}

function show(elem){
    var parent = elem.parentNode;
    var cont = parent.getElementsByClassName('content');
    if(cont.length > 0){
        cont[0].classList.toggle('hide'); 
        if(cont[0].classList.contains('hide')){
            elem.innerHTML = "&#9655;"; 
        }
        else { 
            elem.innerHTML ="&#9661;"; 
        }
        }
    var coll = parent.getElementsByClassName('tcollapsed');
    if(coll.length > 0){
        coll[0].classList.toggle('hide'); 
    }
}

var sls = document.getElementsByClassName('sl');
for(var i=0;i<sls.length;i++){
    sls[i].addEventListener("keypress", noReturn, true);
}

function noReturn(e)
{
    console.log('hello');
  var code = e.keyCode || e.which;
   if(code == 13) {
      e.preventDefault();
   }
}

var activeMenu = null;

function showmenu(elem){
    if (activeMenu != null)
        activeMenu.classList.add('hide');
    var men = elem.getElementsByClassName('openmenu');
    if(men.length >0){
        if(activeMenu == men[0]) {
            activeMenu = null;
        }
        else {
            men[0].classList.remove('hide');
            activeMenu = men[0];
        }
    }
    else {
        activeMenu = null;
    }
}

var currBlink = null; 
var currTitle = null;

var leftprop = document.getElementById('leftprop'); 
var leftinsert = document.getElementById('leftinsert'); 

var firstCaret = document.getElementsByClassName('blink')[0]; 
actBlink(firstCaret);

function getCaret() {
    if(currBlink != null) return currBlink;
    if(currTitle != null) return currTitle;
    return null; 
}

var element_template = document.getElementById('element_template');

function insertElem(type)
{
    var car = getCaret();
    var l = element_template.childNodes.length; 
    for(var i=0;i<l;i++) {
        var cl = element_template.childNodes[i].cloneNode(true);
        var found = cl.getElementsByClassName('ttype'); 
        if(found.length > 0) {
               found[0].innerHTML = type; 
        }
        car.parentNode.insertBefore(cl, car);
    }
}

function clearBlink()
{
    if(currBlink != null){
        currBlink.innerHTML = ''; //  classList.remove('blinkactive');
        currBlink = null;
    }
    if(currTitle!=null)
    {
        currTitle.classList.remove('tselect');
        currTitle = null; 
    }
}

function actBlink(elem) {
    clearBlink();
    if(elem.classList.contains('blink')) {
        currBlink = elem;
        currBlink.innerHTML = "<div class='blinkactive'></div>"; //.classList.add('blinkactive');
        leftprop.classList.add('hide'); 
        leftinsert.classList.remove('hide'); 
    }
}

function selectTitle(elem) {
    clearBlink();
    if(elem.classList.contains('title')) {
        elem.classList.add('tselect'); 
        currTitle = elem; 
        leftinsert.classList.add('hide'); 
        leftprop.classList.remove('hide'); 
    }
}

function carretUp(up) {
    var start = getCaret();
    if(start != null) {
        var base = document.getElementById("base"); 
        var divs = base.getElementsByClassName('caret');
        for(var i=0;i<divs.length;i++){
            if(divs[i] == start) {
                if(up) {
                    i--; 
                } else {
                    i++;
                }
                if(i>= 0 && i< divs.length) {
                    var target = divs[i];
                    if(target.classList.contains('blink')){
                        actBlink(target);  
                    } 
                    else if(target.classList.contains('title')){
                        selectTitle(target);
                    }
                }   
                return;
            }
        }    
    }
}

function mykeypress(e) {
    if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'c') ) {
        console.log( "You pressed CTRL + C" );
    }
        e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        carretUp(true);
        e.preventDefault();
    }
    else if (e.keyCode == '40') {
        carretUp(false);
        e.preventDefault();
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

window.addEventListener("keydown", mykeypress, true);

window.addEventListener("paste", function(e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    var text = e.clipboardData.getData("text/plain");

    // insert text manually
    document.execCommand("insertHTML", false, text);
});
