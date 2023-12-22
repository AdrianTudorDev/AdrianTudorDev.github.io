const loadDB = document.querySelector('#database-container');
const deleteDB = document.querySelector('#database-delete-btn');
const uploadRivets = document.querySelector('#uploadRivets');

var sideBAR
var mainBAR

var TORQUEMOMENTS;
var SCREWS_NUTS;

var selectedSCREWS = [];
var selectedNUTS = [];
var selectedDIAMETERS = [];
var selectedLENGTHS = [];

var finalSelectedSCREW;
var finalSelectedNUT;
var finalSelectedDIAMETER;
var finalSelectedLENGTH;

var searchSCREW;
var searchNUT;
var searchDIAMETER;
var searchLENGTH;

function copyright(){
let cpr = document.querySelector('#copyright-text');
let d = new Date();
cpr.innerText = `\u00A9 ${1900 + d.getYear()} Copyright, Adrian Tudor`
}

document.addEventListener ("DOMContentLoaded", () => {
copyright();

TORQUEMOMENTS = JSON.parse(localStorage.getItem("TORQUEMOMENTS"));

if(TORQUEMOMENTS !== null){
loadDB.classList.add('d-none');
deleteDB.classList.remove('d-none');
} else {
loadDB.classList.remove('d-none');
deleteDB.classList.add('d-none');
}

loadFiltersNorms(TORQUEMOMENTS);
})

uploadRivets.addEventListener("change", () => {
let torquecodes = new FileReader();
torquecodes.readAsText(uploadRivets.files[0]);

torquecodes.onload = function(){
localStorage.setItem('TORQUEMOMENTS', torquecodes.result);
}
location.reload();
});

function deletRivets(){
localStorage.removeItem("TORQUEMOMENTS");
location.reload();
}

const appContainer = document.querySelector('#app-container-torque');

function loadFiltersNorms(items){
let div = document.createElement('div');
div.classList.add('container');
div.classList.add('h-100');
div.classList.add('w-90');


let divcol = document.createElement('div');
divcol.classList.add('col-12');
divcol.classList.add('pt-2');

items.forEach(item => {
let div1 = document.createElement('div');
div1.classList.add('form-check');
div1.classList.add('form-check-inline');
div1.classList.add('px-3');

let input = document.createElement('input');
input.classList.add('form-check-input');
input.setAttribute('type', 'radio');
input.setAttribute('name', 'inlineRadioOptions');
input.setAttribute('id', item.norm);
input.setAttribute('value', item.norm);
input.setAttribute('onclick', "loadScrews()");

let label = document.createElement('label');
label.classList.add('form-check-label');
label.setAttribute('for', item.norm);
label.innerText = item.norm;

div1.appendChild(input);
div1.appendChild(label);
divcol.appendChild(div1);
})

let divrow = document.createElement('div');
divrow.classList.add('row');
divrow.classList.add('overflow-hidden');
divrow.classList.add('mt-3');
divrow.classList.add('h-100');
let divcol1 = document.createElement('div');
divcol1.classList.add('col-4');
divcol1.classList.add('border');
divcol1.classList.add('border-2');
divcol1.classList.add('rounded-3');
divcol1.classList.add('border-info');
divcol1.classList.add('bg-light');
divcol1.setAttribute('id', 'side-bar');
let divcol2 = document.createElement('div');
divcol2.classList.add('col');
divcol2.classList.add('ms-4');
divcol2.classList.add('border');
divcol2.classList.add('border-2');
divcol2.classList.add('rounded-3');
divcol2.classList.add('border-info');
divcol2.classList.add('bg-light');
divcol2.setAttribute('id', 'main-bar');

divrow.appendChild(divcol1);
divrow.appendChild(divcol2);

div.appendChild(divcol);
div.appendChild(divrow);
appContainer.appendChild(div);
mainBAR = appContainer.querySelector('#main-bar');
}

function loadScrews(){
selectedSCREWS = [];

let inputs = appContainer.querySelectorAll('input')

inputs.forEach(input => {
let val
if(input.checked) val = input.value;
TORQUEMOMENTS.forEach(item => {
if(item.norm === val) SCREWS_NUTS = item;
})
})

showScrews();
}

function showScrews(){
sideBAR = appContainer.querySelector('#side-bar');
sideBAR.innerHTML = "";

SCREWS_NUTS.screws.forEach(screw => {
screw.norm.forEach(el => {
selectedSCREWS.indexOf(el) === -1 ? selectedSCREWS.push(el) : "";
})
})

addScrollBlock('Screw:', 'search-screw', 'search_SCREW()', 'Search screw', selectedSCREWS, 'showNuts(this)')

searchSCREW = document.querySelector('#search-screw')
}

function showNuts(e){
mainBAR.innerHTML = "";
e.parentNode.querySelectorAll('li').forEach(li => li.classList.remove('active'))
e.classList.add('active')
if(sideBAR.children.length > 3){
sideBAR.children[3].remove()
sideBAR.children[2].remove()
sideBAR.children[1].remove()
} else if(sideBAR.children.length > 2) {
sideBAR.children[2].remove()
sideBAR.children[1].remove()
} else if(sideBAR.children.length > 1) sideBAR.children[1].remove()

finalSelectedSCREW = e.innerText

let screwGroup = []
let nutGroup = []

SCREWS_NUTS.screws.forEach(screw => {
screw.norm.forEach(el => {
if(el == e.innerText) screwGroup.push(screw.notation)
})
})

screwGroup =[...new Set(screwGroup)];

screwGroup.forEach(screw => {
SCREWS_NUTS.torque.forEach(torque => {
torque.screw.forEach(sr => {
if(sr === screw){
torque.nut.forEach(nut => {
nutGroup.push(nut)
})
}
})
})
})

nutGroup =[...new Set(nutGroup)];

nutGroup.forEach(nut => {
SCREWS_NUTS.nuts.forEach(nu => {
if(nu.notation === nut){
nu.norm.forEach(norm => {
selectedNUTS.push(norm)
})
}
})
})

selectedNUTS =[...new Set(selectedNUTS)];

addScrollBlock('Nut:', 'search-nut', 'search_NUT()', 'Search nut', selectedNUTS, 'showDiameter(this)');

selectedNUTS = [];
searchNUT = document.querySelector('#search-nut');
}

function showDiameter(e){
mainBAR.innerHTML = "";
e.parentNode.querySelectorAll('li').forEach(li => li.classList.remove('active'))
e.classList.add('active')
if(sideBAR.children.length > 3) {
sideBAR.children[3].remove();
sideBAR.children[2].remove();
} else if(sideBAR.children.length > 2) sideBAR.children[2].remove()

finalSelectedNUT = e.innerText

let screwGroup = []
let nutGroup = []
let lengthFunc = false

SCREWS_NUTS.screws.forEach(screws => {
screws.norm.forEach(screw => {
if(screw === finalSelectedSCREW) screwGroup.push(screws.notation)
})
})
screwGroup = [...new Set(screwGroup)];

SCREWS_NUTS.nuts.forEach(nuts => {
nuts.norm.forEach(nut => {
if(nut === finalSelectedNUT) nutGroup.push(nuts.notation)
})
})
nutGroup = [...new Set(nutGroup)];

let torqueGroup = []

SCREWS_NUTS.torque.forEach(torque => {
torque.screw.forEach(screw => {
screwGroup.forEach(groupS => {
if(screw === groupS){
torque.nut.forEach(nut => {
nutGroup.forEach(groupN => {
if(nut === groupN) {
torqueGroup = torque.torque
}
})
})
}
})
})
})

torqueGroup.forEach(tor => {
if(tor.min !== "-") selectedDIAMETERS.push(tor.ident)
if(tor.grip !== undefined) lengthFunc = true
})

if(!lengthFunc) addScrollBlock('Diameter:', 'search-diameter', 'search_DIAMETER()', 'Search diameter', selectedDIAMETERS, 'showMoment(this)');
if(lengthFunc) addScrollBlock('Diameter:', 'search-diameter', 'search_DIAMETER()', 'Search diameter', selectedDIAMETERS, 'showMomentLength(this)');

selectedDIAMETERS = [];
searchDIAMETER = document.querySelector('#search-diameter');

}

function showMomentLength(e){
e.parentNode.querySelectorAll('li').forEach(li => li.classList.remove('active'))
e.classList.add('active')
if(sideBAR.children.length > 3) sideBAR.children[3].remove();
finalSelectedDIAMETER = e.innerText

mainBAR.innerHTML = "";

let screwGroup = []
let nutGroup = []
let gripGroup = []

SCREWS_NUTS.screws.forEach(screws => {
screws.norm.forEach(screw => {
if(screw === finalSelectedSCREW) screwGroup.push(screws.notation)
})
})
screwGroup = [...new Set(screwGroup)];

SCREWS_NUTS.nuts.forEach(nuts => {
nuts.norm.forEach(nut => {
if(nut === finalSelectedNUT) nutGroup.push(nuts.notation)
})
})

nutGroup = [...new Set(nutGroup)];

let torqueGroup = []

SCREWS_NUTS.torque.forEach((torque, index) => {
torque.screw.forEach(screw => {
screwGroup.forEach(groupS => {
if(screw === groupS){
torque.nut.forEach(nut => {
nutGroup.forEach(groupN => {
if(nut === groupN) {
torque.torque.forEach(tr => {
if(tr.ident === finalSelectedDIAMETER) {
tr.grip.forEach(len => gripGroup.push(len.length))
}
})
}
})
})
}
})
})
})

addScrollBlock('Length:', 'search-length', 'search_LENGTH()', 'Search length', gripGroup, 'showMomentTwo(this)');

gripGroup = [];
searchLENGTH = document.querySelector('#search-length');
}

function showMomentTwo(e){
e.parentNode.querySelectorAll('li').forEach(li => li.classList.remove('active'))
e.classList.add('active')
finalSelectedLENGTH = e.innerText

mainBAR.innerHTML = "";

let screwGroup = []
let nutGroup = []

SCREWS_NUTS.screws.forEach(screws => {
screws.norm.forEach(screw => {
if(screw === finalSelectedSCREW) screwGroup.push(screws.notation)
})
})
screwGroup = [...new Set(screwGroup)];

SCREWS_NUTS.nuts.forEach(nuts => {
nuts.norm.forEach(nut => {
if(nut === finalSelectedNUT) nutGroup.push(nuts.notation)
})
})
nutGroup = [...new Set(nutGroup)];

let searchedSCREW;
let searchedNUT;
let searchedDIAMETER;
let searchedDIAMETERMM;
let searchedLENGTH;
let searchedMIN;
let searchedNOM;
let searchedMAX;

SCREWS_NUTS.torque.forEach((torque, index) => {
torque.screw.forEach(screw => {
screwGroup.forEach(groupS => {
if(screw === groupS){
torque.nut.forEach(nut => {
nutGroup.forEach(groupN => {
if(nut === groupN) {
torque.torque.forEach(tr => {
if(tr.ident === finalSelectedDIAMETER) {
searchedDIAMETERMM = tr.diam
tr.grip.forEach(grip => {
if(grip.length === finalSelectedLENGTH) {
searchedSCREW = finalSelectedSCREW
searchedNUT = finalSelectedNUT
searchedDIAMETER = finalSelectedDIAMETER
searchedLENGTH = finalSelectedLENGTH
searchedMIN = grip.min || undefined
searchedNOM = grip.nom || undefined
searchedMAX = grip.max || undefined
}
})
}
})
}
})
})
}
})
})
})

showResultingTorque(searchedSCREW, searchedNUT, searchedDIAMETER, searchedDIAMETERMM, searchedLENGTH, searchedMIN, searchedNOM, searchedMAX)

searchedSCREW = "";
searchedNUT = "";
searchedDIAMETER = "";
searchedDIAMETERMM = "";
searchedLENGTH = "";
searchedMIN = "";
searchedMAX = "";
}

function showMoment(e){
e.parentNode.querySelectorAll('li').forEach(li => li.classList.remove('active'))
e.classList.add('active')
finalSelectedDIAMETER = e.innerText

mainBAR.innerHTML = "";

let screwGroup = []
let nutGroup = []

SCREWS_NUTS.screws.forEach(screws => {
screws.norm.forEach(screw => {
if(screw === finalSelectedSCREW) screwGroup.push(screws.notation)
})
})
screwGroup = [...new Set(screwGroup)];

SCREWS_NUTS.nuts.forEach(nuts => {
nuts.norm.forEach(nut => {
if(nut === finalSelectedNUT) nutGroup.push(nuts.notation)
})
})
nutGroup = [...new Set(nutGroup)];

let torqueGroup = []

SCREWS_NUTS.torque.forEach((torque, index) => {
torque.screw.forEach(screw => {
screwGroup.forEach(groupS => {
if(screw === groupS){
torque.nut.forEach(nut => {
nutGroup.forEach(groupN => {
if(nut === groupN) {
torqueGroup = torque.torque
}
})
})
}
})
})
})

let searchedSCREW;
let searchedNUT;
let searchedDIAMETER;
let searchedDIAMETERMM;
let searchedLENGTH;
let searchedMIN;
let searchedNOM;
let searchedMAX;

torqueGroup.forEach(torque => {
if(torque.ident === finalSelectedDIAMETER){
searchedSCREW = finalSelectedSCREW
searchedNUT = finalSelectedNUT
searchedDIAMETER = finalSelectedDIAMETER
searchedDIAMETERMM = torque.diam
searchedMIN = torque.min
searchedMAX = torque.max
}
})

showResultingTorque(searchedSCREW, searchedNUT, searchedDIAMETER, searchedDIAMETERMM, searchedLENGTH, searchedMIN, searchedNOM,searchedMAX)

searchedSCREW = "";
searchedNUT = "";
searchedDIAMETER = "";
searchedDIAMETERMM = "";
searchedLENGTH = "";
searchedMIN = "";
searchedMAX = "";
}

function addScrollBlock(header, id, func, placeholder, array, func2){
let div = document.createElement('div');
div.classList.add('w-100');
div.classList.add('border');
div.classList.add('border-2');
div.classList.add('rounded-3');
div.classList.add('border-dark');
div.classList.add('text-start');
div.classList.add('mt-1');

let h6 = document.createElement('h6');
h6.classList.add('h-6');
h6.classList.add('pt-3');
h6.classList.add('ps-4');
h6.innerText = header //"Nut:"

let formEle = document.createElement('form');
formEle.classList.add('d-flex');

let input = document.createElement('input');
input.classList.add('form-control');
input.setAttribute('type', 'text');
input.setAttribute('id', id/*'search-nut'*/);
input.setAttribute('onkeyup', func/*'search_NUT()'*/);
input.setAttribute('placeholder', placeholder/*'Search nut'*/);
let divcont = document.createElement('div');
divcont.classList.add('input-group-btn');
let btn = document.createElement('button');
btn.classList.add('btn');
btn.classList.add('btn-default');
btn.setAttribute('onclick', func /*'search_NUT()'*/);
let it = document.createElement('i');
it.classList.add('fa');
it.classList.add('fa-search');

btn.appendChild(it);
divcont.appendChild(btn);
formEle.appendChild(input);
formEle.appendChild(divcont);
div.appendChild(h6);
div.appendChild(formEle);

let ul = document.createElement('ul');
ul.classList.add('list-group');
ul.classList.add('h-20');
ul.classList.add('overflow-hidden');
ul.classList.add('mt-1');

array.forEach(elem => {
let li = document.createElement('li');
li.classList.add('list-group-item');
li.setAttribute('id', elem);
li.setAttribute('onclick', func2);
li.innerText = elem;
ul.appendChild(li);
})

div.appendChild(ul);

sideBAR.appendChild(div);
}

function showResultingTorque(screw, nut, diam, diamm, len, min, nom ,max){

let div = document.createElement('div');
div.classList.add('d-flex');
div.classList.add('flex-column');
div.classList.add('bd-highlight');
div.classList.add('border');
div.classList.add('border-2');
div.classList.add('rounded');
div.classList.add('rounded-3');
div.classList.add('border-secondary');
div.classList.add('mt-3');
div.classList.add('p-2');

let col1 = document.createElement('div');
col1.classList.add('py-2');
col1.classList.add('border-bottom');
col1.classList.add('border-1');
col1.classList.add('border-dark');

let h41 = document.createElement('h4');
h41.classList.add('h-4');
h41.innerHTML = `Screw: <span class="fw-bold">${screw}</span>`;

let col2 = document.createElement('div');
col2.classList.add('py-2');
col2.classList.add('border-bottom');
col2.classList.add('border-1');
col2.classList.add('border-dark');

let h42 = document.createElement('h4');
h42.classList.add('h-4');
h42.innerHTML = `Nut: <span class="fw-bold">${nut}</span>`;

let col3 = document.createElement('div');
col3.classList.add('py-2');
col3.classList.add('border-bottom');
col3.classList.add('border-1');
col3.classList.add('border-dark');
col3.classList.add('text-start');
col3.classList.add('ps-3');

let h43 = document.createElement('h4');
h43.classList.add('h-4');
h43.innerHTML = `Diameter code: <span class="fw-bold">${diam}</span><br>Diameter code [mm]: <span class="fw-bold">${diamm}</span>`;

let col4 = document.createElement('div');
if(len !== undefined) {
col4.classList.add('py-2');
col4.classList.add('border-bottom');
col4.classList.add('border-1');
col4.classList.add('border-dark');

let h44 = document.createElement('h4');
h44.classList.add('h-4');
h44.innerHTML = `Length: <span class="fw-bold">${len}</span>`;
col4.appendChild(h44);
}

let col5 = document.createElement('div');
col5.classList.add('py-2');

col5.classList.add('text-start');
col5.classList.add('ps-3');

let h45 = document.createElement('h4');
h45.classList.add('h-4');
if(min){
h45.innerHTML = `Torque moment:</br>
&nbsp &nbsp &nbsp &nbsp minimum [Nm]: <span class="fw-bold">${min}</span><br>
&nbsp &nbsp &nbsp &nbsp nominal [Nm]: <span class="fw-bold">${(Number(min) + Number(max))/2}</span></br>
&nbsp &nbsp &nbsp &nbsp maximum [Nm]: <span class="fw-bold">${max}</span>`;
} else if (nom) {
h45.innerHTML = `Torque moment:</br>
&nbsp &nbsp &nbsp &nbsp nominal [Nm]: <span class="fw-bold">${nom}</span></br>`;
}


col1.appendChild(h41);
col2.appendChild(h42);
col3.appendChild(h43);
col5.appendChild(h45);

div.appendChild(col1);
div.appendChild(col2);
div.appendChild(col3);
if(len !== undefined) div.appendChild(col4);
div.appendChild(col5);

mainBAR.appendChild(div);
}

window.addEventListener("change", () => {
searchDIAMETER = document.querySelector('#search-diameter') || undefined;
searchLENGTH = document.querySelector('#search-lenght') || undefined;
})

function search_SCREW() {
  // Declare variables
  let filter, searched, txtValue, txtValueSecond;
  filter = searchSCREW.value.toUpperCase();
  searched = searchSCREW.parentElement.nextElementSibling.children
 
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < searched.length; i++) {
 
txtValue = searched[i].innerText;

if(txtValue.toUpperCase().indexOf(filter) > -1) searched[i].classList.remove('d-none')  
else searched[i].classList.add('d-none')
  }
}
function search_NUT() {
  // Declare variables
  let filter, searched, txtValue, txtValueSecond;
  filter = searchNUT.value.toUpperCase();
  searched = searchNUT.parentElement.nextElementSibling.children
 
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < searched.length; i++) {
 
txtValue = searched[i].innerText;

if(txtValue.toUpperCase().indexOf(filter) > -1) searched[i].classList.remove('d-none')  
else searched[i].classList.add('d-none')
  }
}
function search_DIAMETER() {
  // Declare variables
  let filter, searched, txtValue, txtValueSecond;
  filter = searchDIAMETER.value.toUpperCase();
  searched = searchDIAMETER.parentElement.nextElementSibling.children
 
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < searched.length; i++) {
 
txtValue = searched[i].innerText;

if(txtValue.toUpperCase().indexOf(filter) > -1) searched[i].classList.remove('d-none')  
else searched[i].classList.add('d-none')
  }
}
function search_LENGTH() {
  // Declare variables
  let filter, searched, txtValue, txtValueSecond;
  filter = searchLENGTH.value.toUpperCase();
  searched = searchLENGTH.parentElement.nextElementSibling.children
 
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < searched.length; i++) {
 
txtValue = searched[i].innerText;

if(txtValue.toUpperCase().indexOf(filter) > -1) searched[i].classList.remove('d-none')  
else searched[i].classList.add('d-none')
  }
}