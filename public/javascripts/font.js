"use strict";


var xmlhttp = new XMLHttpRequest();
var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBQLd206nVJp5NKjsr7an_SrilLNSpXN5Q";
var items = []; 
var item_index = 0; 
let f1 = document.getElementById('f1'); 
let f2 = document.getElementById('f2'); 

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
        clickdiv(f1);
        clickdiv(f2);
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

f1.addEventListener("click", function() {
        clickdiv(f2);
    }); 
f2.addEventListener("click", function() {
        clickdiv(f1);
    }); 

let wbh = document.getElementById('wbh'); 
let wb = document.getElementById('wb'); 
let wh = document.getElementById('wh'); 

let change_header = true;
let change_body = true; 

function what(x)
{
    if(x=='bodyheader') {

        wbh.classList.add('sel'); 
        wb.classList.remove('sel'); 
        wh.classList.remove('sel'); 
        change_header = true;
        change_body = true; 

    }
    else if(x=='body') {
        wbh.classList.remove('sel'); 
        wb.classList.add('sel'); 
        wh.classList.remove('sel'); 
        change_header = false;
        change_body = true; 
    }
    else if(x == 'header') {
        
        wbh.classList.remove('sel'); 
        wb.classList.remove('sel'); 
        wh.classList.add('sel');
        change_header = true;
        change_body = false;  
    }
}

function colors(openOrClose) {
    f2.getElementsByClassName('fontdiv')[0].classList.toggle('hidden'); 
    f2.getElementsByClassName('blabla')[0].classList.toggle('hidden'); 
}

function clickdiv(parent) {
    let d = parent.getElementsByClassName('fontdiv')[0];
    item_index++;
    if(item_index >= items.length) {
        item_index = 0; 
    } 
    var font = items[item_index].family;
    loadFont(font);
    if(change_header) {
        console.log('header');
        let hhh = d.getElementsByClassName('hhh'); 
        for(let i=0;i<hhh.length;i++) {
            hhh[i].style.fontFamily = font; 
        }
        let hname = d.parentElement.parentElement.getElementsByClassName('hname')[0]; 
        hname.innerText = font;  
        hname.style.fontFamily = font;
    }
    if(change_body) {
        console.log('body');
        let bbb = d.getElementsByClassName('bbb'); 
        for(let i=0;i<bbb.length;i++) {
            bbb[i].style.fontFamily = font; 
        }
        let bname = d.parentElement.parentElement.getElementsByClassName('bname')[0]; 
        bname.innerText = font;  
        bname.style.fontFamily = font;
    }
}
