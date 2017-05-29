"use strict";

function show(triangle){
    var elem = triangle.nextSibling;
    
    elem.classList.toggle('collapse');
    if(elem.classList.contains('collapse'))
    {
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
}

var leftprop = document.getElementById('leftprop'); 
var leftinsert = document.getElementById('leftinsert'); 

// CARET and ELEMENT

var currCaret = null; 
var currElement = null;  
var editbase = document.getElementById("editbase");
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
        old.parentElement.classList.remove('leftborder');
    }

    currCaret = null;
    currElement = elem;
    console.log('elementFocus1: caret ', currCaret);
    console.log('elementFocus2: caret ', getCaret());
    leftinsert.classList.add('hide'); 
    leftprop.classList.remove('hide'); 
}

function caretFocus(caret){
    
    var old =getCaret(); 
    if(old != null) {
        old.parentElement.classList.remove('leftborder');
    }
    currElement = null;
    var newChild = caretFocus_template.childNodes[0].cloneNode(true);
    caret.parentElement.replaceChild( newChild,caret);
    currCaret = newChild;
    currCaret.focus();
    leftprop.classList.add('hide'); 
    leftinsert.classList.remove('hide'); 
    currCaret.parentElement.classList.add('leftborder');
    console.log('caretFocus: caret ' + currCaret);
}

function blinkEditBlur(blinkEdit)
{
    //blinkEdit.style.display = 'none';
    console.log('whatr the hell');
}

function refocus() {
    if(currCaret!= null) currCaret.focus(); 
    else if(currElement != null) currElement.focus();
}
// avoids to loose focus
function focusLast(elem) {
    //console.log('focus last'); 
    //console.log(elem);
    var carets = editbase.getElementsByClassName('caret');
    if(elem.id == 'startbase'){
        var target = carets[0]; //TODO!!!
        target.focus();
    }
    else {
        var target = carets[0]; 
        target.focus();
    }
}

document.getElementsByClassName('caret')[0].focus(); 

function carretMove(move) {
    if(move == 0) { return; }
    var start = getCaret();
    var divs = editbase.getElementsByClassName('caret');

    if(start != null) {
        for(var i=0;i<divs.length;i++){
            if(divs[i] == start) {   
                i += move;
                i = Math.min(divs.length-1,Math.max(0,i));
                divs[i].focus();    
                return;
            }
        }    
    }
    else {
        if(move < 0) { divs[0].focus(); }
        else { divs[divs.length-1].focus(); }
    }
}

function mykeypress(e) {
    
        e = e || window.event;
    if ((e.metaKey || e.ctrlKey) && ( e.keyCode == 13 )) {
        console.log( "You pressed CTRL + RETURN" + currCaret);
        if(currCaret != null) {
            console.log(currCaret.innerText);
            pastetext(currCaret);   
            currCaret.innerText='';
        } 
    }
    /*
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
    */
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
    var text = e.clipboardData.getData('text/plain');
    //var text = e.clipboardData.getData('text/html');
    
    console.log(text);
    /*
    var dummy = document.getElementById('pastedummy'); 
    dummy.innerHTML = text; 
    text = dummy.innerText; 
    dummy.innerHTML = '';
    */

    // insert text manually
    document.execCommand("insertText", false, text);
});




var element_template = document.getElementById('element_template');
var textelement_template = document.getElementById('textelement_template');
var caret_template = document.getElementById('caret_template').childNodes[0];
var caretFocus_template = document.getElementById('caretFocus_template');

function deleteElementButton(elem)
{
    console.log('implement deleteElementButton');
    carretMove(1);
    var target = elem.parentElement.parentElement; 
    var caret = target.previousSibling; 
    console.log('delete', target, caret);
    var par = target.parentElement; 
    par.removeChild(target);
    par.removeChild(caret);

}

function removeElement(elem)
{
    if(elem == null) {
        console.log('elem is null'); 
        elem = getCaret(); 
    }
    if(elem == null) {
        console.log('no caret'); 
        return;
    }

    var parent = elem.parentElement;
    var grandparent = parent.parentElement; 
    /*console.log('DELETE');
    console.log(elem);
    console.log(parent);
    console.log(grandparent); */

    
    if(!elem.classList.contains('caret')){
        console.log('not a caret. cannot remove'); 
        return; 
    }
    if(!elem.classList.contains('element') && !elem.classList.contains('text')){
        console.log('neither a element nor a textelement. cannot remove'); 
        return; 
    }

    if(!parent.classList.contains('elementbox')){
        alert('remove problem 1'); 
        return; 
    }
    if(!grandparent.classList.contains('content')){
        alert('remove problem 2'); 
        return; 
    }
    carretMove(2);
    
    grandparent.removeChild(parent); 



}

function insertElem(type, str)
{
    var car = getCaret(); 
    if(car == null) {
        alert('caret not set');
        return;
    }
    console.log(car.classList);
    if(car.id == 'baseElement') {
        alert('cannot insert before base element');
        return;
    }
    if(!car.classList.contains('blink') && !car.classList.contains('edit')) {
        console.log('need blink not element as reference'); 
        return;
    }

    var templ = null;
    if('text' == type) {
        templ = textelement_template.childNodes; 
    } 
    else {
        templ = element_template.childNodes; 
    }
    
    
    

    var sibling = car.parentElement;
    var content = car.parentElement.parentElement; 
    if(car.parentElement.classList.contains('content'))
    {
        console.log('other'); 
        content = car.parentElement;
        sibling = car; 
    }
    console.log('insert before'); 
    console.log(car); 
    console.log(sibling); 
    console.log(content); 

    
    if(!content.classList.contains('content')){
        alert('problem insertElem 2'); 
        return; 
    }

   for(var i=0;i<templ.length;i++) {
        var cl = templ[i].cloneNode(true);
        var found = cl.getElementsByClassName('ttype'); 
        if(found.length > 0) {
            found[0].innerHTML = type; 
        }
        content.insertBefore(cl, sibling);
    }
    refocus();
    
    // for text special
    return cl;
}
function textBlur(textElement){
    var text = textElement.innerText.trim(); 
    var isNew = true; 
    if(textElement.classList.contains('text')) {
        isNew = false;
    }
    console.log('isNew:' + isNew); 

    //TODO: insert new text element
    //TODO: remove text element
    //TODO: paste Jade ...
    //TODO: fusion successive text elements

    // if empty, replace by caret
    if(text.length == 0){
        if(isNew){
            var newChild = caret_template.cloneNode(true);
            textElement.parentElement.replaceChild(newChild,textElement);
            currCaret =  newChild;
            console.log('new empty');   
        } 
        else {
            console.log('old empty: needs implemenation');
            removeElement(textElement); 
        }
    }
    else {
        if(isNew) {
            console.log('new  create');
            insertElem('text',text);
            textElement.innerHTML = '&nbsp;';
        }
        else {
            console.log('old nothing');
        }
    }
}

function caretKeyDown(ev, elem)
{
    //need tad prevent default for navigation
    console.log(ev.keyCode);
    return;
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
            || str[i] == ' ' 
            || str[i] == ')' 
            || str[i] == ')') {
                return i;
            }
    return -1; 
}

function readJadeToNext(x){
    var res = { before:'' , after:''};
    var index = specialIndex(x);
    if(index < 0) {
        res.before = x; 
        res.after = '';
    }
    else {
        res.before = x.substr(0, index);
        res.after = x.substr(index, x.length-index); 
    }
    return res; 
}

function getJadeLines(str)
{
    var lines = str.split('\n');
    var res =[]; 
    for(var i=0;i<lines.length;i++){
        var tr = lines[i].trim();
        if(tr.length==0){ continue; }
        var l = {
            indent:lines[i].search(/\S/), 
            trim : tr, 
            tag: 'div',
            id: '',
            classes: []
        };
        if(tr[0] == '+') {
            l.tag = 'mixin';
        }
        else if(tr[0] != '#' && tr[0] != '.') {
            var tagger = readJadeToNext(tr); 
            l.tag = tagger.before; 
            tr = tagger.after;
        }
        l.rest = tr; 
        res.push(l);

        if(tr.length==0){ console.log('done'); continue; }
        
        if(tr[0] == '#') {
            tr = tr.substr(1); 
            var idder = readJadeToNext(tr);
            l.id = idder.before; 
            tr = idder.after;
        }
        else { l.id = '' }

        if(tr.length==0){ continue; }

        while(tr[0] == '.') {
            tr = tr.substr(1); 
            var cl = readJadeToNext(tr);
            l.classes.push(cl.before);
            tr = cl.after; 
            if(tr.length==0){ continue; }
        }

        if(tr.length==0){ continue; }

        
        console.log(l.indent + ":"+ l.tag +" id="+ l.id + " classes="+ l.classes); 
        
    }

    console.log('===');

    // do indent
    if(res.length == 0) { return res; }
    var inds =[res[0].indent]; 
    var curr = 0; 
    var last = 0; 
    for(var i=0;i<res.length;i++){
        var l = res[i]; 
        //console.log('comp ' + res[i].indent + ' !' + inds[inds.length-1]);
        if(l.indent > inds[inds.length-1]){
            inds.push(l.indent); 
            curr++;
        }
        while(l.indent < inds[inds.length-1])
        {
            inds.splice(-1,1);
            curr--; 
            //console.log('del ' + inds);
        }
        l.i2 = curr; 
        l.di = last-curr; 

        last = curr; 
        //console.log(l.indent + ":"+ l.tag +" id="+ l.id + " classes="+ l.classes); 
        console.log(res[i].i2 + '|' + res[i].di + ":"+ res[i].tag +" id="+ l.id + " classes="+ l.classes); 
    }
    return res; 
}

function pastetext(textelem)
{
    //var textelem = button.nextSibling; 
    console.log(textelem.innerText);

    var jjj = getJadeLines(textelem.innerText);

    var sum = 0;
    for(var i = 0;i < jjj.length;i++){
        var ji = jjj[i];
        if(ji.di != 0){
            carretMove(jjj[i].di);
            sum += jjj[i].di;
        }
        
        var newElem = insertElem(ji.tag);
        
        if(ji.id != '') {
            newElem.getElementsByClassName('tid')[0].innerText = ji.id; 
        }
        if(ji.classes.length > 0) {
            newElem.getElementsByClassName('tclass')[0].innerText = ji.classes.join(' '); 
        }
    }
    carretMove(-sum);
    //textelem.innerHTML = endstring;
}
