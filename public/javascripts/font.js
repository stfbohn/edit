"use strict";


var xmlhttp = new XMLHttpRequest();
var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBQLd206nVJp5NKjsr7an_SrilLNSpXN5Q";
var items = []; 
var item_index = 5; 
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        items = shuffle(myArr.items);     
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

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

var loadFont = function(font) {
  WebFont.load({
    google: {
      families: [font]
    }
  });
};


/*
AIzaSyBQLd206nVJp5NKjsr7an_SrilLNSpXN5Q
*/

function clickdiv(parent) {

    let d = parent.getElementsByClassName('fontdiv')[0];


    item_index++;
    if(item_index >= items.length) {
        item_index = 0; 
    } 
    d.classList.toggle('clicked');
    setTimeout(function(){
        var font = items[item_index].family;
        loadFont(font);
        d.style.fontFamily = font;

        let fontname = d.parentElement.parentElement.getElementsByClassName('fontinfo')[0].getElementsByClassName('name')[0]; 
        fontname.innerText = font;  
        fontname.style.fontFamily = font;

        //var h = d.getElementsByClassName('fontname'); 
        //h[0].innerText = font; 
        d.classList.toggle('clicked');
    }, 300);
}

var divs = document.getElementsByClassName('fontcont'); 
for(let i = 0; i <divs.length; i++) {
    let x = divs.item(i);
    divs.item(i).addEventListener("click", function() {

        clickdiv(x);
    } /*clickdiv(divs.item(i)*/);  
    //console.log(divs.item(i).innerText); 
}