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

function show(triangle){
    var elem = triangle.nextSibling;
    console.log("before:", elem,elem.itemId, elem.classList.contains('collapse'));
    elem.classList.toggle('collapse');
    if(elem.classList.contains('collapse'))
    {
        console.log('collased'); 
        triangle.innerHTML = "&#9655;";
    }
    else {
        triangle.innerHTML = "&#9661;";
    }
    
    console.log("after:", elem, elem.getElementById, elem.classList.contains('collapse')); 
    console.log(triangle.innerHTML); 
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

var currBlink = null; 
var currTitle = null;

var leftprop = document.getElementById('leftprop'); 
var leftinsert = document.getElementById('leftinsert'); 

var firstCaret = document.getElementsByClassName('blink')[0]; 
setCaret(firstCaret);

function getCaret() {
    if(currBlink != null) return currBlink;
    if(currTitle != null) return currTitle;
    return null; 
}


function setCaretBorder(elem, show)
{
    var p1 = elem.parentNode; 
    if(p1 != null) {
        var p2 = p1.parentNode; 
        if(p2 != null) {
            if(show) {
                p2.classList.add('showborder');
            }
            else {
                p2.classList.remove('showborder');    
            }
        }
    }
}

function clearCaret()
{
    if(currBlink != null){
        setCaretBorder(currBlink, false);  
        currBlink.innerHTML = ''; 
        currBlink = null;
    }
    if(currTitle!=null)
    {
        currTitle.classList.remove('tselect');
        currTitle = null; 
    }
}

function setCaret(elem) {
    clearCaret();
    if(elem.classList.contains('blink')) {
        currBlink = elem;
        currBlink.innerHTML = "<div class='blinkactive'></div>"; //.classList.add('blinkactive');
        leftprop.classList.add('hide'); 
        leftinsert.classList.remove('hide');
        setCaretBorder(elem, true); 
        elem.parentNode.parentNode.classList.add('showborder'); 
    }
    else if(elem.classList.contains('title')) {
        elem.classList.add('tselect'); 
        currTitle = elem; 
        leftinsert.classList.add('hide'); 
        leftprop.classList.remove('hide'); 
    }
    else {
        console.log("Imposible to set caret", elem); 
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
                    setCaret(divs[i]); 
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

var element_template = document.getElementById('element_template');
var text_template = document.getElementById('text_template');

function insertElem(type)
{
    var car = getCaret();
    var templ = null; 
    if('text' == type) {
        templ = text_template.childNodes; 
    } 
    else {
        templ = element_template.childNodes; 
    }

   for(var i=0;i<templ.length;i++) {
        var cl = templ[i].cloneNode(true);
        var found = cl.getElementsByClassName('ttype'); 
        if(found.length > 0) {
            found[0].innerHTML = type; 
        }
        car.parentNode.insertBefore(cl, car);
    }
    
    carretUp(true);
}