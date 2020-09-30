//VARIABLES


let cajaHistorial = document.querySelector('.history');
var btnHistorial = document.getElementsByClassName('btnHistory');
var contador = 0;





//BUSQUEDA

let campoBusqueda = document.querySelector('.busqueda');
var valorBusqueda = document.querySelector('#valor');
let searchBtn = document.querySelector('#main-btn');
let opcBusqueda = document.querySelector('.opc-busqueda');
let enviar = document.querySelector('#enviar');
var elementos = document.querySelector('#elem');
var resBusqueda = document.querySelector('.resBusqueda');
var valor = document.querySelector('#valor');



//SUGERENCIAS

let rowSuggestions = document.querySelector('.filaSugerencias');
var btnCaja = document.getElementsByClassName('btnCaja');
var misSugerencias = ['simpsons', 'star wars', 'cartoon network', 'divertidos'];

//ARRAYS

var listaSearch = [];
var titulosBusqueda = [];
var listaTrending = [];
var titulosTrending = [];
var misBusquedas = [];
var listaSug = [];
var listaTitulos = [];
let guardarHistorial = [];
let mi_objeto;




//EVENT LISTENERS


window.addEventListener('load', eventosCarga);

enviar.addEventListener('click', eventosBusqueda);

valorBusqueda.addEventListener('keyup', normalToActive);

valorBusqueda.addEventListener('keyup', keyCodeEnter);

valorBusqueda.addEventListener('keyup', keyUpCampo);





function keyUpCampo() {

  if (valorBusqueda.value == "") {
    opcBusqueda.style = "display: none;";
  } else {

    //Muestra el menu de sugerencias
    opcBusqueda.style = "display: flex; flex-direction:column; padding: 0px";

    sendToPage();

  }
}


const sugerencias = ["Avengers", "Alien", "Avatar",
  "Baby", "Back to the future", "Bad boys",
  "Cofee", "Cake", "Captain America",
  "Double dragon", "Donkey kong", "Daredevil",
  "Evangelion", "Everything", "Expendables",
  "Fallout", "Fast and furious", "Fall in love",
  "Garfield", "Gandalf", "Gatsby",
  "Horseman", "House", "Horrible",
  "Island", "Imagination", "Iron man",
  "Jason friday 13th", "Jurasic Park", "Jackass",
  "Kangaroo", "Kill Bill", "Knights",
  "Lost", "Looney Toons", "Love",
  "Monkey", "Moon", "Marvelous",
  "Nightmare", "Next", "Night",
  "Octopus", "Old boy", "Optimus Prime",
  "Pokemon", "Pirate", "Party",
  "Quest", "Queen", "Query",
  "Radioactive", "Radio", "Racing Car",
  "Saint Seiya", "Superman", "Spiderman",
  "Thor", "TNMT", "Twister",
  "Underworld", "Universal", "Unstoppable",
  "Vampire", "Van damme", "Venom",
  "Woman", "Whip", "War",
  "X files", "Xmen", "Xena",
  "Yugi Oh", "Yellow", "Yo-kai watch",
  "Zoolander", "Zoo", "Zombie"]

const searchInput = document.querySelector('#valor');
const suggestionsPanel = document.querySelector('.opc-busqueda');

var sendToPage = function () {

  const input = searchInput.value;
  suggestionsPanel.innerHTML = "";
  const suggestions = sugerencias.filter(function (data) {
    return data.toLowerCase().startsWith(input);
  })

  suggestions.forEach(function (suggested) {
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'button');
    input.setAttribute('value', suggested);
    input.setAttribute('onclick', `searchFetch("${suggested}")`);
    suggestionsPanel.appendChild(input);
  });

  if (input === '') {
    suggestionsPanel.innerHTML = "";
  }

}


//Realiza la carga de la funciones que se necesitan al iniciar

function eventosCarga() {
  mostrarSugerencias();
  tendenciasFetch();
  mostrar();
  verBtnHistorial();
  recargaPagina();

}


//Realiza varios eventos al hacer click en buscar

function eventosBusqueda() {
  let busqueda = valor.value;

  if (busqueda == "") {
    alert('Por favor ingrese una busqueda..')
  } else {

    searchFetch(busqueda);

    mostrarLocalStorage(busqueda);
    verBtnHistorial();
    limpiarCampo();

    enviar.classList.add('normal');
    enviar.classList.remove('activa');
    enviar.setAttribute('disabled', 'disabled');
    opcBusqueda.style = "display: none;";
    listaSearch.splice(0, listaSearch.length);
    titulosBusqueda.splice(0, titulosBusqueda.length);
  }
}




//Limpia el capo de busqueda
function limpiarCampo() {
  if (valorBusqueda.value != "") {
    valorBusqueda.value = "";
  }
}




//FUNCIONES









//Esta funcion detecta la recarga y guarda del localStorage al array guardarHistorial

function recargaPagina() {
  
  if (guardarHistorial == "") {
    let mi_objeto = JSON.parse(localStorage.getItem("history"));
    for (k in mi_objeto) {
      guardarHistorial.push(mi_objeto[k]);
    }

  }
}


//Funcion mostrar nos sirve para recorrer el historial localStorage al iniciar la app 
//y crear botones de las anteriores busquedas

function mostrar() {

  let largo = localStorage.length;

  if (largo == "") {
    console.log('localStorage Vacio');
  }else {
    mi_objeto = JSON.parse(localStorage.getItem("history"));
    for (k in mi_objeto) {
      crearBtnHistorial(mi_objeto[k]);
    }
  }


}


//Similar al anterior solo que este se realiza en base a la busqueda actual y no al historial
function mostrarLocalStorage(busqueda) {

  if(localStorage.length == 0) {
    guardarHistorial.push(busqueda);
    localStorage.setItem("history", JSON.stringify(guardarHistorial));
    crearBtnHistorial(busqueda);
  }else {
    guardarHistorial.push(busqueda);
    localStorage.setItem("history", JSON.stringify(guardarHistorial));
    crearBtnHistorial(busqueda);
  }

}





//Normal to Active es una funcion relacionada al estado del boton buscar


function normalToActive() {
  if (valorBusqueda.value == "") {
    enviar.classList.add('normal');
    enviar.classList.remove('activa');
    enviar.setAttribute('disabled', 'disabled');

  } else {
    enviar.classList.remove('normal');
    enviar.classList.add('activa');
    enviar.removeAttribute('disabled');
  }
}



//Key Code enter chequea el keyCode del evento on keyUp si nos da enter (13) hace la busqueda

function keyCodeEnter(e) {

  let busqueda = valor.value;
  let enter = 13
  if (e.keyCode == enter) {
    searchFetch(busqueda);
    mostrarLocalStorage(busqueda);
    verBtnHistorial();
    limpiarCampo();

    enviar.classList.add('normal');
    enviar.classList.remove('activa');
    enviar.setAttribute('disabled', 'disabled');
    listaSearch.splice(0, listaSearch.length);
    titulosBusqueda.splice(0, titulosBusqueda.length);

  }

}



function crearBtnHistorial(busqueda) {

  var newButton = document.createElement("button");
  var valueButton = document.createTextNode(busqueda);
  newButton.appendChild(valueButton);
  newButton.setAttribute('class', 'btnHistory');
  cajaHistorial.appendChild(newButton);

}



function verBtnHistorial() {
  let btnHistory = Array.from(btnHistorial);
  for (a in btnHistory) {
    btnHistory[a].addEventListener('click', function (e) {

      if (listaSearch == "") {
        searchFetch(this.innerText);
      } else {
        listaSearch.splice(0, listaSearch.length);
        titulosBusqueda.splice(0, titulosBusqueda.length);
        searchFetch(this.innerText);
      }


    })
  }

}










//FUNCIONES FETCH


//LLAMA AL ENDPOINT SEARCH DE GIPHY

function searchFetch(url) {

  fetch(`https://api.giphy.com/v1/gifs/search?q=${url}&api_key=5bIrA5CGCfUFE7P8FWJez1t14xzWVJAF&limit=12`)
    .then(function (res) {

      if (res.ok) {
        return res.json();

      } else {
        throw "Error en la llamada";
      }

    })
    .then(function (json) {

      for (j in json.data) {
        let resultado = json.data[j].images.downsized.url;
        let titulos = json.data[j].title;

        titulosBusqueda.push(titulos);
        listaSearch.push(resultado);

      }

      if (url == "") {
        alert('Por favor ingrese una busqueda..')
      } else {

        elementos.innerHTML = `

          <input type="text" placeholder=" Resultado de la Busqueda">
  
          <div class="fila_1">
            <div class="caja">
            <img src=${listaSearch[0]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[0]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[1]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[1]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[2]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[2]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[3]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[3]}</span>
            </div>        
          </div>
  
          <div class="fila_2">
            <div class="caja">
            <img src=${listaSearch[4]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[4]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[5]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[5]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[6]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[6]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[7]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[7]}</span>
            </div> 
          </div>
  
          <div class="fila_3">
            <div class="caja">
            <img src=${listaSearch[8]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[8]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[9]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[9]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[10]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[10]}</span>
            </div>
            <div class="caja">
            <img src=${listaSearch[11]}>
            <span class="lineaTrending" style="display:none">#${titulosBusqueda[11]}</span>
            </div>       
          </div> `;


        limpiarCampo();
        opcBusqueda.style = "display: none;";
        listaSearch.splice(0, listaSearch.length);
        titulosBusqueda.splice(0, titulosBusqueda.length);

        busquedaLinea();
      }



    })


    .catch(function (error) {
      alert(error);
    })
}



//LLAMA A LOR 4 VALORES DENTRO DEL ARRAY MIS SUGERENCIAS

function mostrarSugerencias() {
  for (x in misSugerencias) {
    let url = `https://api.giphy.com/v1/gifs/search?q=${misSugerencias[x]}&api_key=5bIrA5CGCfUFE7P8FWJez1t14xzWVJAF&limit=1`;

    sugerenciasFetch(url);
  }


}



//AGREGA UNA ESCUCHA A LOS 4 BOTONES DE VER MAS Y LLAMA LA BUSQUEDA SEGUN SU ID

function botonCaja() {

  let verMas = Array.from(btnCaja)
  for (i in verMas) {

    verMas[i].addEventListener('click', function () {

      if (listaSearch == "") {
        searchFetch(this.id)
      } else {
        listaSearch.splice(0, listaSearch.length);
        searchFetch(this.id)
      }

    })
  }

}



//FETCH TO OUR SUGGESTIONS


function sugerenciasFetch(url) {

  fetch(url)
    .then(function (res) {

      if (res.ok) {
        return res.json();

      }
      else {
        throw 'Error en Sugerencias'
      }
    })

    .then(function (json) {


      for (x in json.data) {

        let resultado = json.data[x].images.downsized.url;
        let titulo = json.data[x].title;

        let divisiones = titulo.split(" ", 2);
        let titulo2 = divisiones.join(' ');


        listaTitulos.push(titulo2);
        listaSug.push(resultado);


      }




      rowSuggestions.innerHTML =
        `
          <div class="caja">
          <span class="linea">#${listaTitulos[0]}
          <img class="close" src="img/button close.svg" alt="close"></span>
          <img src=${listaSug[0]}>
          <button class="btnCaja" id="${listaTitulos[0]}">Ver más...</button>
          </div>
          <div class="caja">
          <span class="linea">#${listaTitulos[1]}
          <img class="close" src="img/button close.svg" alt="close"></span>
          <img src=${listaSug[1]}>
          <button class="btnCaja" id="${listaTitulos[1]}">Ver más...</button> 
          </div>

          <div class="caja">
          <span class="linea">#${listaTitulos[2]}
          <img class="close" src="img/button close.svg" alt="close"></span>
          <img src=${listaSug[2]}>
          <button class="btnCaja" id="${listaTitulos[2]}">Ver más...</button> 
          </div>

          <div class="caja">
          <span class="linea">#${listaTitulos[3]}
          <img class="close" src="img/button close.svg" alt="close"></span>
          <img src=${listaSug[3]}>
          <button class="btnCaja" id="${listaTitulos[3]}">Ver más...</button> 
          </div> `



      botonCaja();


    })

    .catch(function (error) {
      console.log(error);

    })


}




//FETCH TRENDING ENDPOINT

function tendenciasFetch() {

  let url = 'https://api.giphy.com/v1/gifs/trending?api_key=5bIrA5CGCfUFE7P8FWJez1t14xzWVJAF&limit=10';

  let fila1 = document.querySelector('.fila_1');
  let fila2 = document.querySelector('.fila_2');
  let fila3 = document.querySelector('.fila_3');

  fetch(url)
    .then(function (res) {

      if (res.ok) {
        return res.json();
      }
      else {
        throw 'Error en Sugerencias'
      }
    })

    .then(function (json) {

      for (k in json.data) {

        let titulos = json.data[k].title;
        let resultado = json.data[k].images.downsized.url;
        titulosTrending.push(titulos);
        listaTrending.push(resultado);

      }


      fila1.innerHTML = `
                        <div class="caja trending">
                        <img src=${listaTrending[0]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[0]}</span>
                        </div>

                        <div class="caja trending">
                        <img src=${listaTrending[1]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[1]}</span>
                        </div>

                        <div class="caja trending">
                        <img src=${listaTrending[2]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[2]}</span>
                        </div>

                        <div class="caja trending">
                        <img src=${listaTrending[3]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[3]}</span>
                        </div> `;

      fila2.innerHTML = `
                        <div class="caja_grande trending">
                        <img src=${listaTrending[4]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[4]}</span>
                        </div>

                        <div class="caja trending">
                        <img src=${listaTrending[5]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[5]}</span>
                        </div>

                        <div class="caja trending">
                        <img src=${listaTrending[6]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[6]}</span>
                        </div> `;

      fila3.innerHTML = `
                        <div class="caja trending">
                        <img src=${listaTrending[7]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[7]}</span>
                        </div>

                        <div class="caja trending">
                        <img src=${listaTrending[8]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[8]}</span>
                        </div>

                        <div class="caja_grande trending">
                        <img src=${listaTrending[9]}>
                        <span class="lineaTrending" style="display:none">#${titulosTrending[9]}</span>
                        </div>`;

      tendenciasLinea();

    })

    .catch(function (error) {
      console.log(error);

    })

}




function tendenciasLinea() {
  let cajaChica = document.getElementsByClassName('caja trending');
  let cajaGrande = document.getElementsByClassName('caja_grande trending');
  let nvaCajaChica = Array.from(cajaChica);
  let nvaCajaGrande = Array.from(cajaGrande);

  for (x in nvaCajaGrande) {

    nvaCajaGrande[x].addEventListener('mouseover', function (e) {
      let titulo = e.path[1].children[1];
      titulo.style.display = "block";
    }),

      nvaCajaGrande[x].addEventListener('mouseout', function (x) {
        let titulo = x.path[1].children[1];
        titulo.style.display = "none";
      })
  }


  for (k in nvaCajaChica) {
    nvaCajaChica[k].addEventListener('mouseover', function (a) {

      let titulo = a.path[1].children[1];
      titulo.style.display = "block";

    }),


      nvaCajaChica[k].addEventListener('mouseout', function (event) {

        let titulo = event.path[1].children[1];
        titulo.style.display = "none";
      })

  }

}




/*-----------------------------------*/
/*Prueba*/
/*-----------------------------------*/

function busquedaLinea() {
  let cajaChica = document.getElementsByClassName('caja');
  let nvaCajaChica = Array.from(cajaChica);

  for (k in nvaCajaChica) {
    nvaCajaChica[k].addEventListener('mouseover', function (e) {

      let titulo = e.path[1].children[1];
      titulo.style.display = "block";

    }),


      nvaCajaChica[k].addEventListener('mouseout', function (event) {

        let titulo = event.path[1].children[1];
        titulo.style.display = "none";
      })

  }

}

