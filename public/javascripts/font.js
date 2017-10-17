"use strict";


var xmlhttp = new XMLHttpRequest();
var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBQLd206nVJp5NKjsr7an_SrilLNSpXN5Q";
var items = []; 
var item_index = 0; 

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        items = shuffle(myArr.items);
        let boxes = document.getElementById('container').getElementsByClassName('box'); 
        for(let i=0;i<boxes.length;i++) {
            initBox(boxes[i]); 
        }
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var loadFont = function(font) {
  WebFont.load({
    google: {
      families: [font]
    }
  });
};


let boxtemp = document.getElementById('boxtemplate').getElementsByClassName('box')[0];

function initBox(box)
{
    setBodyFont(box, next_font('body')); 
    setHeaderFont(box, next_font('header')); 
    
    box.addEventListener("click", function() {
        boxClick(box);
    });     
}

function next_font(which) {
    item_index++;
    if(item_index >= items.length) {
        item_index = 0; 
    } 
    var font = items[item_index].family;
    loadFont(font);
    return font; 
}

function setHeaderFont(target, font) {
    target.getElementsByClassName('hname')[0].innerText = font;  
    console.log('set header:' + font);
    let children = target.getElementsByClassName('inner')[0].childNodes;
    for(let i=0;i<children.length;i++) {
        if(children[i].tagName != 'P') {
            children[i].style.fontFamily = font; 
        }
    }
}
function setBodyFont(target, font) {
    target.getElementsByClassName('bname')[0].innerText = font;  
    console.log('set body:' + font); 
    let children = target.getElementsByClassName('inner')[0].childNodes;
    for(let i=0;i<children.length;i++) {
        if(children[i].tagName == 'P') {
            children[i].style.fontFamily = font; 
        }
    }
}

let bodyOrHeader = 'all'; 

function updateFont(target, header, body)
{
    console.log('doing ' + target.classList); 
    //return;
    if(bodyOrHeader == 'header') {
        let font = next_font('header');
        setHeaderFont(target,font); 
        setBodyFont(target,body); 
    }
    else if (bodyOrHeader == 'body'){
        let font = next_font('body');
        setHeaderFont(target,header); 
        setBodyFont(target,font); 
    }
    else /* all */ {
        let font = next_font('all');
        setHeaderFont(target,font); 
        setBodyFont(target,font); 
    }
}

let transition_speed = 250; 
let overlay = document.getElementById('overlay')
console.log(overlay);

function boxClick(sender){ 
    if(sender == null) {
        sender = document.getElementById('container').getElementsByClassName('box')[0]; 
    }

    // is first or second? 
    let boxes = sender.parentElement.getElementsByClassName('box'); 
    
    let fontBody = boxes[0].getElementsByClassName('bname')[0].innerText;  
    let fontHeader = boxes[0].getElementsByClassName('hname')[0].innerText; 

    console.log('ref fonts ' + fontHeader + ' ' + fontBody);
    
    if(boxes[0] == sender) {
        boxes[1].color = 'white';
        updateFont(boxes[1], fontHeader, fontBody); 
        setTimeout(function(){ 
            boxes[1].color = 'black';  
        }, 250); 
  } 
  else if(boxes[1] == sender) {
        let target = boxes[0];
        let parent = target.parentElement;

        let cln = boxtemp.cloneNode(true);
        initBox(cln);
        updateFont(boxes[2], fontHeader, fontBody); 
        parent.insertBefore(cln,overlay);

        // transition slow kill
        target.style.width = 0;
        boxes[2].color = 'white';
        setTimeout(function(){ 
            boxes[2].color = 'black'; 
            target.parentNode.removeChild(target); 
        }, 250); 
  }
  else {
      console.error('not found'); 
  }
}



let modeButtons = document.getElementsByClassName('mode'); 
let buttons = document.getElementById('top').getElementsByTagName('button'); 

function toggleButtons(target)
{
     for(let i=0;i<buttons.length;i++) {
        if(target == buttons[i]){
            buttons[i].classList.add('selected');
        }
        else {
             buttons[i].classList.remove('selected');
        }
    }
}

function toggleMode(sender) {
    bodyOrHeader = sender.name; 
    console.log(bodyOrHeader); 
    toggleButtons(sender); 

    let parent = document.getElementById('container'); 
    let boxes = parent.getElementsByClassName('box'); 
    let insertCount = 3-boxes.length; 
    let fontBody = boxes[0].getElementsByClassName('bname')[0].innerText;  
    let fontHeader = boxes[0].getElementsByClassName('hname')[0].innerText; 
    console.log(insertCount); 
    
    for(let i=0;i<insertCount;i++)
    {
        let cln = boxtemp.cloneNode(true);
        initBox(cln);
        updateFont(cln, fontHeader, fontBody); 
        parent.insertBefore(cln,overlay);
    }

    boxClick(null); 
}


function download(sender) {
    toggleButtons(sender); 
    let cont = document.getElementById('container');
    let boxes = cont.getElementsByClassName('box'); 
    console.log('length ' + boxes.length); 
    for(let i=boxes.length-1;i>0;i--) {
        console.log('remove '  + i); 
        //console.log(boxes[i]); 
        cont.removeChild(boxes[i]); 
    }
}

function hideStart() {
    let start = document.getElementById('start'); 
    start.style.display = 'none'; 
}

let bookmarkFontButton = document.getElementById('bookmarkFont'); 
console.log(bookmarkFontButton.innerText); 
function bookmarkFont()
{
    if(bookmarkFontButton.innerHTML == ' &#9733'){
        console.log('allready bookmarked')
    }
    else {
        console.log(bookmarkFontButton.innerHTML); 
         bookmarkFontButton.innerHTML = ' &#9733';
         console.log('TODO: implement bookmark');
    }
}
