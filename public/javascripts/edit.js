"use strict";

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
        var dummy = elem.getElementsByClassName('dummy')[0];
        var content = elem.getElementsByClassName('content')[0];
        var childs =  content.getElementsByClassName('element'); 
        if(childs.length==0) {
            dummy.innerText = 'empty';
            var text = content.getElementsByClassName('ttext');
            if(text.length > 0) {
                dummy.innerText = text[0].innerText;
            }
        }
        else {dummy.innerText = childs.length + ' children';}
         

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



var leftprop = document.getElementById('leftprop'); 
var leftinsert = document.getElementById('leftinsert'); 

// CARET and ELEMENT

var currCaret = null; 
var currElement = null;
var lastCaret = document.getElementById('lastbinker'); 
var beforeFirstCaret = document.getElementById('startbase'); 
var base = document.getElementById("base");
var baseElement = document.getElementById("baseElement");
function getCaret() {
    if(currCaret != null) return currCaret;
    if(currElement != null) return currElement;
    return null; 
}

var elementmenu = document.getElementById('elementmenu'); 

function elementFocus(elem){
    var old =getCaret(); 
    if(old != null) {
        if(old.classList.contains('blink')) {
            console.log(old);
            old.parentElement.classList.remove('leftborder');
        }
    }

    currCaret = null;
    currElement = elem;
    leftinsert.classList.add('hide'); 
    leftprop.classList.remove('hide'); 
    
    return; 
    var rect = elem.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    elementmenu.style.left= (rect.left + 15).toString() + 'px';
    elementmenu.style.top= (rect.top + 15).toString() + 'px';
    
}

function caretFocus(caret){
    
    var old =getCaret(); 
    if(old != null) {
        if(old.classList.contains('blink')) {
            console.log(old);
            old.parentElement.classList.remove('leftborder');
        }
    }

    currElement = null;
    currCaret = caret;
    leftprop.classList.add('hide'); 
    leftinsert.classList.remove('hide'); 
    caret.parentElement.classList.add('leftborder');
}

function refocus() {
    if(currCaret!= null) currCaret.focus(); 
    else if(currElement != null) currElement.focus();
}
// avoids to loose focus
function focusLast(elem) {
    if(elem.id == 'startbase'){
        baseElement.focus();
    }
    else {
        lastCaret.focus();
    }
}
focusLast(beforeFirstCaret);

function carretMove(move) {
    var start = getCaret();
    if(start != null) {
        var divs = base.getElementsByClassName('caret');
        for(var i=0;i<divs.length;i++){
            if(divs[i] == start) {   
                i += move;
                i = Math.min(divs.length-1,Math.max(0,i));
                divs[i].focus();    
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
/*
window.addEventListener("keydown", mykeypress, true);

window.addEventListener("paste", function(e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    //var text = e.clipboardData.getData("text/plain");
    var text = e.clipboardData.getData("text/html");
    var dummy = document.getElementById('pastedummy'); 
    dummy.innerHTML = text; 
    text = dummy.innerText; 
    dummy.innerHTML = '';

    // insert text manually
    document.execCommand("insertHTML", false, text);
});
*/



var element_template = document.getElementById('element_template');
var text_template = document.getElementById('text_template');
var caret_template = document.getElementById('caret_template');

function deleteElementButton(elem)
{
    carretMove(1);
    var target = elem.parentElement.parentElement; 
    var caret = target.previousSibling; 
    console.log('delete', target, caret);
    var par = target.parentElement; 
    par.removeChild(target);
    par.removeChild(caret);

}
function insertElem(type)
{
    var car = getCaret();
    var templ = null;
    var toRemove = null; 
    if('text' == type) {
        templ = text_template.childNodes; 
        toRemove = currCaret; 
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
    refocus();
    carretMove(-1);

    // for text special
    
    if(toRemove != null){
        var nextSibling = toRemove.nextSibling; 
        if(nextSibling == null) {
            var parent = toRemove.parentElement; 
            parent.removeChild(toRemove)
        }
        
    }
    return cl;
}
function textBlur(textElement){
    text = textElement.innerText.trim(); 
    if(text.length > 0){
        textElement.innerText = text; 
        }
    else {
        var par = textElement.parentElement; 
        var triangle = textElement.previousSibling; 
        
        par.removeChild(triangle); 
        par.removeChild(textElement);
        if(par.childElementCount == 0)
        {
            console.log("problem");
            var car = caret_template.childNodes[0].cloneNode(true); 
            par.appendChild(car); 
            console.log("New count=" + par.childElementCount);
        }   
    }
}

function caretKeyDown(ev, elem)
{
    var keycode = ev.keyCode;
    if ((ev.metaKey || ev.ctrlKey) && keycode == 13) {
        console.log( "You pressed CTRL + ENTER" );
        ev.preventDefault();

        var rect = elem.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        elementmenu.style.left= (rect.left + 15).toString() + 'px';
        elementmenu.style.top= (rect.top).toString() + 'px';
        elementmenu.classList.remove('hide'); 

    }
    else
    { 
        var valid = 
            (keycode > 47 && keycode < 58)   || // number keys
            keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
            (keycode > 64 && keycode < 91)   || // letter keys
            (keycode > 95 && keycode < 112)  || // numpad keys
            (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
            (keycode > 218 && keycode < 223);   // [\]' (in order)

        if(valid)
        {
            //console.log(ev);
            //console.log(elem);
            if (ev.keyCode == '13') {
                ev.preventDefault(); 
            }
            insertElem('text');
        }
    }
}

function specialIndex(str)
{
    for(var i=0; i<str.length;i++)
        if(str[i] == '#' 
            || str[i] == '.' 
            || str[i] == '(' 
            || str[i] == ')' 
            || str[i] == ')') {
                return i;
            }
    return -1; 
}

function readJadeToNext(str){
    var tr = str.trim();
    var res = { before:'' , after:''};
    var index = specialIndex(tr);
    if(index < 0) {
        res.before = tr; 
        res.after = '';
    }
    else {
        res.before = tr.substr(0, index);
        res.after = tr.substr(index, tr.length-index); 
    }
    return res; 
}

function pastetext(button)
{
    var textelem = button.nextSibling; 
    console.log(textelem.innerText);
    var lines = textelem.innerText.trim().split('\n');
    var endstring = ''; 
    var indents = [lines[0].search(/\S/)] ;
    for(var i = 0;i < lines.length;i++){
        //console.log(indent.toString() + ':' + lines[i]);
        var indent = lines[i].search(/\S/);
        if(indents[indents.length-1] < indent){
            indents.push(indent);
        }
        else {
            carretMove(1);
        }
        
        while (indents[indents.length-1] > indent){
            delete indents[indents.length-1];
            carretMove(1);
        }
        var tr = lines[i].trim(); 
        if(tr.length < 1) continue;
        
        var tag = 'div';
        if(tr[0] != '#' && tr[0] != '.') {
            var res = readJadeToNext(tr); 
            tag = res.before; 
            tr = res.after;
        }
        var newElem = insertElem(tag);
        if(tr.length == 0) continue;
        
        if(tr[0] == '#') {
            tr = tr.substr(1,tr.length-1);
            var res = readJadeToNext(tr); 
            var id = res.before; 
            tr = res.after;
            console.log(tag + ' id=' + id, newElem);
            newElem.getElementsByClassName('tid')[0].innerText = id;
        }
        
        console.log(tag + ' rest=' + tr);
        
        
        

        endstring += indent.toString() + ':' + lines[i] + '<br>'; 
    }
    textelem.innerHTML = endstring;
}