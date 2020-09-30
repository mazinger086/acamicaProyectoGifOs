//Variables

let mi_objeto;
let idGif = [];
let misGIFOS = document.querySelector('.cajas');



//Event Listeners
window.addEventListener('load', function () {

    if(idGif == "") {
     let miGuifo = JSON.parse(localStorage.getItem("gifOs"));
        for (x in miGuifo) {
            idGif.push(miGuifo[x]);
        } 
    }

    mostrar();

})






//Funciones

function mostrar() {
  
    let largo = localStorage.length;
  
    if (largo != "") {
        mi_objeto = JSON.parse(localStorage.getItem("gifOs"));
        for (k in mi_objeto) {
          crearCajaGifOS(mi_objeto[k]);
          }
    }  
  
}


function crearCajaGifOS(key) {

    var newGIF = document.createElement("img");
        newGIF.setAttribute('src', `https://media.giphy.com/media/${key}/giphy.gif`);
        newGIF.setAttribute('alt', key);
    
    var cajaGIF = document.createElement('div');
        cajaGIF.setAttribute('class', 'caja');
        cajaGIF.appendChild(newGIF);        
        misGIFOS.appendChild(cajaGIF);
  
}