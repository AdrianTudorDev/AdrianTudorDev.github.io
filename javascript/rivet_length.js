const loadDB = document.querySelector('#database-container');
const deleteDB = document.querySelector('#database-delete-btn');
const uploadRivets = document.querySelector('#uploadRivets');

var RIVETSCODES;

function copyright(){
let cpr = document.querySelector('#copyright-text');
let d = new Date();
cpr.innerText = `\u00A9 ${1900 + d.getYear()} Copyright, Adrian Tudor`
}

document.addEventListener ("DOMContentLoaded", () => {
copyright();

RIVETSCODES = JSON.parse(localStorage.getItem("RIVETSCODES"));

if(RIVETSCODES !== null){
loadDB.classList.add('d-none');
deleteDB.classList.remove('d-none');
} else {
loadDB.classList.remove('d-none');
deleteDB.classList.add('d-none');
}

loadFilters();
})

uploadRivets.addEventListener("change", () => {
let rivetscodes = new FileReader();
rivetscodes.readAsText(uploadRivets.files[0]);

rivetscodes.onload = function(){
localStorage.setItem('RIVETSCODES', rivetscodes.result);
}
location.reload();
});

function deletRivets(){
localStorage.removeItem("RIVETSCODES");
location.reload();
}

 const inputrivetdiametercod = document.querySelector('#inputrivetdiametercod');
 const inputrivetdiametermm = document.querySelector('#inputrivetdiametermm');
 const inputrivetlenghtcod = document.querySelector('#inputrivetlenghtcod');
 const inputrivetlenghtmm = document.querySelector('#inputrivetlenghtmm');
 const inputthicknesslenghtmm = document.querySelector('#inputthicknesslenghtmm');
 const btncalc = document.querySelector('#btn-calculate');
 const showResults = document.querySelector('#show-results');

function conversion(){
let irdc = Number(inputrivetdiametercod.value)
let irdm = Number(inputrivetdiametermm.value)
let irlc = Number(inputrivetlenghtcod.value)
let irlm = Number(inputrivetlenghtmm.value)

if(!Number.isInteger(irlc)) {
inputrivetlenghtcod.value = Math.floor(irlc);
}
if(!Number.isInteger(irdc)) {
inputrivetdiametercod.value = Math.floor(irdc);
}

if(irdc < 3) {
inputrivetdiametercod.value = 3;
inputrivetdiametermm.value = parseFloat(3 * 1 / 32 * 25.4).toFixed(2);
};
if(irlc < 1) {
inputrivetlenghtcod.value = 1;
inputrivetlenghtmm.value = parseFloat(1 * 1 / 16 * 25.4).toFixed(2);
};

if(irlc && inputrivetlenghtcod === document.activeElement ) {
inputrivetlenghtmm.value = parseFloat(irlc * 1 / 16 * 25.4).toFixed(2);
}
if(irdc && inputrivetdiametercod === document.activeElement ) {
inputrivetdiametermm.value = parseFloat(irdc * 1 / 32 * 25.4).toFixed(2);
}

if(irlm && inputrivetlenghtmm === document.activeElement ) {
inputrivetlenghtcod.value = Math.round(irlm * 1 * 16 / 25.4);
}
if(irdm && inputrivetdiametermm === document.activeElement ) {
inputrivetdiametercod.value = Math.round(irdm * 1 * 32 / 25.4);
}
}

const normCode = document.querySelector('#norm-code');
const normCodeImg = document.querySelector('#norm-code-img');
const materialCode = document.querySelector('#material-code');
const materialCodeImg = document.querySelector('#material-code-img');

function loadFilters(){
let opt1 = document.createElement('option');
opt1.setAttribute('selected', '');
opt1.innerText = 'Rivet Norm';
normCode.appendChild(opt1);

RIVETSCODES.rivets.forEach(rivet => {
let opt = document.createElement('option');
opt.setAttribute('value', rivet.rivet);
opt.innerText = rivet.rivet;
normCode.appendChild(opt);
})

let opt2 = document.createElement('option');
opt2.setAttribute('selected', '');
opt2.innerText = 'Material';
materialCode.appendChild(opt2);

RIVETSCODES.materials.forEach(mat => {
let opt = document.createElement('option');
opt.setAttribute('value', mat.material);
opt.innerText = mat.material;
materialCode.appendChild(opt);
})
}

function loadImg(){
RIVETSCODES.rivets.forEach(rivet => {
if(normCode.value === rivet.rivet) {
normCodeImg.classList.remove('d-none')
normCodeImg.src = rivet.imgsrc
}
})
RIVETSCODES.materials.forEach(mat => {
if(materialCode.value === mat.material) {
materialCodeImg.classList.remove('d-none')
materialCodeImg.src = mat.imgsrc
}
})
}

function calculate(){
showResults.innerHTML = '';
let e = Number(inputthicknesslenghtmm.value);
let d = Number(inputrivetdiametermm.value);

let zenk;
let src

RIVETSCODES.rivets.forEach(rivet => {
if(rivet.rivet === normCode.selectedOptions[0].innerText) {
zenk = rivet.zenk;
src = rivet.imgsrc2;
}
})

let len;
let lmin;
let lmax;

let div = document.createElement('div');
div.classList.add('col-12');

let figure = document.createElement('figure');
figure.classList.add('figure');

let img = document.createElement('img');
img.classList.add('figure-img');
img.classList.add('img-fluid');
img.classList.add('rounded');
img.setAttribute('src', src);
img.setAttribute('alt', 'Rivet assembly model');

let figcaption = document.createElement('figcaption');
figcaption.classList.add('figure-caption');
figcaption.classList.add('fw-bold');
figcaption.classList.add('fs-3');
figcaption.classList.add('mt-1');


if(e < 1.1) {
figcaption.innerText = 'nu se poate nitui';
}
else{
if(d <= 4 && !zenk){
lmin = e + 1.3 * d;
lmax = e + 1.5 * d;
} else if (d > 4 && !zenk) {
lmax =  e + 1.3 * d;
} else if(zenk){
lmin = e + 0.7 * d;
lmax = e + 1.3 * d;
}
lmax = lmax / 1 * 16 / 25.4
if(Math.round(lmax) > lmax) len = `${Math.floor(lmax)}-5`;
else len = Math.floor(lmax);

figcaption.innerText = `${normCode.selectedOptions[0].innerText}${materialCode.selectedOptions[0].innerText}${inputrivetdiametercod.value}-${len}`;
}

figure.appendChild(img);
figure.appendChild(figcaption);
div.appendChild(figure);
showResults.appendChild(div);
}

window.addEventListener('change', ()=>{
conversion()
if (Number(inputthicknesslenghtmm.value) !== 0 && Number(inputrivetdiametermm.value) !== 0)  btncalc.classList.remove('disabled');
else btncalc.classList.add('disabled');
loadImg();
})

window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
calculate();
    }
});