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
        //clickdiv(f1);
        //clickdiv(f2);
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

let ppps = document.getElementsByClassName('pr'); 
for(let i=0; i< ppps.length;i++) { 
    let parent = ppps[i].parentElement.parentElement.parentElement; 
    ppps[i].addEventListener("click", function() {
        console.log(this.parentElement.classList[1]); 
        clickdiv(parent, this.parentElement.classList);
    });     
}
let fixs = document.getElementsByClassName('fix'); 
for(let i=0; i< fixs.length;i++) {
    //console.log(ppps[i].classList); 
    let parent = fixs[i].parentElement.parentElement.parentElement; 
    fixs[i].addEventListener("click", function() {
        fixit(fixs[i]);
    });     
}

function getParent(elem, cl) {
    let par = elem; 
    while(!par.classList.contains(cl)) {
        par = par.parentElement; 
    }
    return par; 
}

function fixit(fix)
{
    fix.classList.toggle('fixed'); 
    if(fix.classList.contains('header')){
        if(fix.classList.contains('fixed')){
            change_header = false; 
        }
        else {
            change_header = true; 
        }
        let par = getParent(fix,'fontcont');
        console.log('header' + par.classList);
    }
    else if(fix.classList.contains('body')){
        if(fix.classList.contains('fixed')){
            change_body = false; 
        }
        else {
            change_body = true; 
        }
        let par = getParent(fix,'fontcont');
        console.log('body' + par.classList); 
    }
    console.log('fix',fix);
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

let sample = document.getElementById('sample'); 

function change(level) {
    let font = next_font(level); 
    let children = sample.childNodes;
    if('header' == level) {
        for(let i=0;i<children.length;i++) {
            if(children[i].tagName != 'P')
                children[i].style.fontFamily = font; 
        }
    }
    else if('body' == level) {
        for(let i=0;i<children.length;i++) {
            if(children[i].tagName == 'P')
                children[i].style.fontFamily = font; 
        }
    }
    else {
       for(let i=0;i<children.length;i++) {
            children[i].style.fontFamily = font; 
        } 
    }
}

function clickdiv(parent, what) {
    let d = parent.getElementsByClassName('fontdiv')[0];
    item_index++;
    if(item_index >= items.length) {
        item_index = 0; 
    } 
    var font = items[item_index].family;
    loadFont(font);
    if(what.contains('header')) {
        //console.log('header');
        let hhh = d.getElementsByClassName('hhh'); 
        for(let i=0;i<hhh.length;i++) {
            hhh[i].style.fontFamily = font; 
        }
        let hname = d.parentElement.parentElement.getElementsByClassName('hname')[0]; 
        hname.innerText = font;  
        //hname.style.fontFamily = font;
    }
    if(what.contains('body')) {
        console.log('body');
        let bbb = d.getElementsByClassName('bbb'); 
        for(let i=0;i<bbb.length;i++) {
            bbb[i].style.fontFamily = font; 
        }
        let bname = d.parentElement.parentElement.getElementsByClassName('bname')[0]; 
        bname.innerText = font;  
        //bname.style.fontFamily = font;
    }
}
