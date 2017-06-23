"use strict";

let cont = document.getElementById('char'); 
let templ = document.getElementById('template').getElementsByClassName('butt')[0]; 

function init() {
    for(let i=9632;i<9632+100;i++) {
        let cln = templ.cloneNode(true); 
        cln.innerText = '&#' + i.toString() + ';'
        cont.appendChild(cln); 
    }
}
init();


