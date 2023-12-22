const loadDB = document.querySelector('#database-container');
const subNavbarSupportedContent = document.querySelector('#subNavbarSupportedContent')
const deleteDB = document.querySelector('#database-delete-btn');
const uploadCodes = document.querySelector('#uploadCodes');
const uploadProcesses = document.querySelector('#uploadProcesses');
const uploadMaterials = document.querySelector('#uploadMaterials');

var PTCODES
var PTMATERIALS
var PTPROCESSES

var divLeft = document.createElement('div');
var divRight = document.createElement('div');

uploadCodes.addEventListener("change", () => {
let ptcodes = new FileReader();
ptcodes.readAsText(uploadCodes.files[0]);

ptcodes.onload = function(){
localStorage.setItem('PTCODES', ptcodes.result);
}
location.reload();
});

uploadProcesses.addEventListener("change", () => {
let ptprocesses = new FileReader();
ptprocesses.readAsText(uploadProcesses.files[0]);

ptprocesses.onload = function(){
localStorage.setItem('PTPROCESSES', ptprocesses.result);
}
location.reload();
});

uploadMaterials.addEventListener("change", () => {
let ptmaterials = new FileReader();
ptmaterials.readAsText(uploadMaterials.files[0]);

ptmaterials.onload = function(){
localStorage.setItem('PTMATERIALS', ptmaterials.result);
}
location.reload();
});

function deletDatabase(){
localStorage.removeItem("PTCODES");
localStorage.removeItem("PTMATERIALS");
localStorage.removeItem("PTPROCESSES");
location.reload();
}

function searchOS() {
  // Declare variables
  let filter, PTCodeNumber, MatCodeNumber, ProcCodeNumber, txtValue, txtValueSecond;
  filter = search.value.toUpperCase();
  PTCodeNumber = document.querySelectorAll(".PTCodeNumber");
  MatCodeNumber = document.querySelectorAll(".MatCodeNumber");
  ProcCodeNumber = document.querySelectorAll(".ProceCodeNumber");

  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < PTCodeNumber.length; i++) {
 
    txtValue = PTCodeNumber[i].getElementsByTagName("h5")[0].innerText;
txtValueSecond = PTCodeNumber[i].getElementsByTagName("h6")[0].innerText;

    if(txtValue.toUpperCase().indexOf(filter) > -1 || txtValueSecond.toUpperCase().indexOf(filter) > -1)PTCodeNumber[i].classList.remove('d-none')  
else PTCodeNumber[i].classList.add('d-none')
  }
 
  for (let i = 0; i < MatCodeNumber.length; i++) {
 
    txtValue = MatCodeNumber[i].getElementsByTagName("span")[0].innerText;

    if(txtValue.toUpperCase().indexOf(filter) > -1) MatCodeNumber[i].classList.remove('d-none')  
else MatCodeNumber[i].classList.add('d-none')
  }
 
  for (let i = 0; i < ProcCodeNumber.length; i++) {
 
    txtValue = ProcCodeNumber[i].getElementsByTagName("span")[0].innerText;

    if(txtValue.toUpperCase().indexOf(filter) > -1) ProcCodeNumber[i].classList.remove('d-none')  
else ProcCodeNumber[i].classList.add('d-none')
  }
}

const appContainer = document.querySelector('#app-container');

function newDetailePage(e){
appContainer.innerHTML = "";
let ptcode = PTCODES[e];

let divcontainer = document.createElement('div')
divcontainer.classList.add('container')
divcontainer.classList.add('pt-3');
divcontainer.classList.add('ms-6');
divcontainer.classList.add('mt-5');
divcontainer.classList.add('w-75');
divcontainer.classList.add('border');
divcontainer.classList.add('border-2');
divcontainer.classList.add('rounded-2');
divcontainer.classList.add('border-dark');
divcontainer.classList.add('bg-light');
divcontainer.classList.add('text-center');


let divrow1 = document.createElement('div');
divrow1.classList.add('row');

let divcol1 = document.createElement('div')
divcol1.classList.add('col');

let h3 = document.createElement('h3');
h3.classList.add('h3');
h3.classList.add('mt-1');
h3.classList.add('mb-2');
h3.innerHTML = `Code: <span class="fw-bold">${ptcode.Code}</span>`
divcol1.appendChild(h3);

let divrow2 = document.createElement('div');
divrow2.classList.add('row');

let divcol2 = document.createElement('div')
divcol2.classList.add('col');
let h4 = document.createElement('h4');

if(ptcode.substitue == '' || ptcode.substitue == undefined) h4.innerText = '';
else{
h4.innerHTML = `Substitute cod: <span class="fw-bold">${ptcode.substitue}</span>`;
h4.classList.add('h4');
h4.classList.add('mt-1');
h4.classList.add('mb-4');
}
divcol2.appendChild(h4);

let divrow3 = document.createElement('div');
divrow3.classList.add('row');
divrow3.classList.add('text-start');
divrow3.classList.add('ms-3');
divrow3.classList.add('mb-4');

let divcol3 = document.createElement('div')
divcol3.classList.add('col');

let h5 = document.createElement('h5');
h5.classList.add('h5');
h5.classList.add('mt-1');
h5.innerHTML = `Description: </br></br><span class="fw-bold">${ptcode.Use_PAI.description}</span>`
divcol3.appendChild(h5);

let divrow4 = document.createElement('div');
divrow4.classList.add('row');
divrow4.classList.add('mb-4');

let divcol4 = document.createElement('div')
divcol4.classList.add('col');

let h5cat = document.createElement('h5');
h5cat.classList.add('h5');
h5cat.classList.add('mt-1');
h5cat.innerHTML = `Environmental Category: <span class="fw-bold">${ptcode.env_cat}</span>`
divcol4.appendChild(h5cat);

let divrow5 = document.createElement('div');
divrow5.classList.add('row'); ;
divrow5.classList.add('text-start');
divrow5.classList.add('ms-3');
divrow5.classList.add('mb-4');

let divcol5 = document.createElement('div')
divcol5.classList.add('col-12');

let pcat = document.createElement('p');
pcat.classList.add('fs-5');
pcat.innerText = `Protection Scheme:`
divcol5.appendChild(pcat);

ptcode.Use_PAI.protection_scheme.forEach(elem => {
let div = document.createElement('div')
div.classList.add('col-12');

let p = document.createElement('p');
p.classList.add('fs-5');
p.classList.add('mt-0');
p.innerHTML = `<span class="fw-bold">${elem}</span>`
div.appendChild(p);

divcol5.appendChild(div)
});

let divrow6 = document.createElement('div');
divrow6.classList.add('row'); ;
divrow6.classList.add('text-start');
divrow6.classList.add('ms-3');
divrow6.classList.add('mb-3');

let divcol6 = document.createElement('div')
divcol6.classList.add('col-12');

let pnor = document.createElement('p');
pnor.classList.add('fs-5');
pnor.innerText = `Norms:`
divcol6.appendChild(pnor);

ptcode.Use_PAI.norms.forEach(elem => {
let div = document.createElement('div')
div.classList.add('col-12');

let p = document.createElement('p');
p.classList.add('fs-5');
p.classList.add('mt-0');
p.innerHTML = `<span class="fw-bold">${elem}</span>`
div.appendChild(p);

divcol6.appendChild(div)
});


divrow1.appendChild(divcol1);
divrow2.appendChild(divcol2);
divrow3.appendChild(divcol3);
divrow4.appendChild(divcol4);
divrow5.appendChild(divcol5);
divrow6.appendChild(divcol6);

divcontainer.appendChild(divrow1);
divcontainer.appendChild(divrow2);
divcontainer.appendChild(divrow4);
divcontainer.appendChild(divrow3);
divcontainer.appendChild(divrow5);
divcontainer.appendChild(divrow6);

appContainer.appendChild(divcontainer);
}

function getSpecificCode(e){
divRight.classList.add('col-7');
divRight.classList.add('row');
divRight.classList.add('pt-3');
divRight.classList.add('border');
divRight.classList.add('border-2');
divRight.classList.add('rounded-2');
divRight.classList.add('border-dark');
divRight.classList.add('bg-light');
divRight.innerHTML = "";

let h5 = document.createElement('h5');
h5.classList.add('h4');
h5.classList.add('mt-1');
h5.classList.add('mb-2');
h5.classList.add('text-center');
h5.innerHTML = `Code: <span class="fw-bold">${PTCODES[e.id].Code}</span>`;

let h6 = document.createElement('h6');

if(PTCODES[e.id].substitue == '' || PTCODES[e.id].substitue == undefined) h6.innerText = '';
else{
h6.innerHTML = `Substitute cod: <span class="fw-bold">${PTCODES[e.id].substitue}</span>`;
h6.classList.add('h5');
h6.classList.add('mt-1');
h6.classList.add('mb-3');
h6.classList.add('text-center');
}

let p = document.createElement('p');
p.classList.add('fs-6');
p.classList.add('mt-1');
p.classList.add('mb-3');
p.classList.add('text-center');
p.innerHTML = `Environmental Category: <span class="fw-bold">${PTCODES[e.id].env_cat}</span>`;

let pUse = document.createElement('p');
pUse.classList.add('fs-6');
pUse.classList.add('mt-1');
pUse.classList.add('mx-3');
pUse.classList.add('mb-3');
pUse.innerHTML = `<span class="fw-bold">${PTCODES[e.id].use_for}</span>`;

let pUseDetail = document.createElement('p');
pUseDetail.classList.add('fs-6');
pUseDetail.classList.add('mt-1');
pUseDetail.classList.add('mx-3');
pUseDetail.classList.add('mb-3');
pUseDetail.innerHTML = `<span class="fw-bold">${PTCODES[e.id].use_for_details}</span>`;

let pExemple = document.createElement('p');
pExemple.classList.add('fs-6');
pExemple.classList.add('mt-1');
pExemple.classList.add('mx-3');
pExemple.classList.add('mb-3');
pExemple.innerHTML = `Examples of applicability - refer to design guidelines: </br><span class="fw-bold">${PTCODES[e.id].exemple}</span>`;

let pScheme = document.createElement('p');
pScheme.classList.add('fs-6');
pScheme.classList.add('mt-1');
pScheme.classList.add('mx-3');
pScheme.classList.add('mb-3');
pScheme.classList.add('text-center');
pScheme.innerHTML = `Protection Scheme: </br><span>${PTCODES[e.id].prot_schem}</span>`;

let divCont = document.createElement('div')
divCont.classList.add('row');
divCont.classList.add('mt-1');
divCont.classList.add('mb-3');
let divRow = document.createElement('div')
divRow.classList.add('row');

let divCol = document.createElement('div')
divCol.classList.add('col');

let pAIPI = document.createElement('p');
pAIPI.classList.add('fs-6');
pAIPI.classList.add('text-center');
pAIPI.innerHTML = `acc. AIPI: </br><span>${PTCODES[e.id].AIPI}</span>`;

divCol.appendChild(pAIPI);

let divCol2 = document.createElement('div')
divCol2.classList.add('col');

let p80T = document.createElement('p');
p80T.classList.add('fs-6');
p80T.classList.add('text-center');
p80T.innerHTML = `acc. 80T: </br><span class="fw-bold">${PTCODES[e.id].eightyT}</span>`;

divCol2.appendChild(p80T);

divRow.appendChild(divCol);
divRow.appendChild(divCol2);
divCont.appendChild(divRow);

let pMaterial = document.createElement('p');
pMaterial.classList.add('fs-6');
pMaterial.classList.add('mt-1');
pMaterial.classList.add('mb-3');
pMaterial.classList.add('text-center');
pMaterial.innerHTML = `Material: </br><span>${PTCODES[e.id].material}</span>`;

let divContPross = document.createElement('div')
divContPross.classList.add('row');
divContPross.classList.add('mt-1');
divContPross.classList.add('mb-3');

let divRowProos = document.createElement('div')
divRowProos.classList.add('row');
let divRowAntet = document.createElement('div')
divRowAntet.classList.add('row');

let divColPross1 = document.createElement('div')
divColPross1.classList.add('col');
let divColAntet1 = document.createElement('div')
divColAntet1.classList.add('col');

let pAIPIpross = document.createElement('p');
pAIPIpross.classList.add('fs-6');
pAIPIpross.classList.add('text-center');
pAIPIpross.innerHTML = `<span>${PTCODES[e.id].pro_app_mat_AIPI}</span>`;
let pAIPIAntet = document.createElement('p');
pAIPIAntet.classList.add('fs-6');
pAIPIAntet.classList.add('text-center');
pAIPIAntet.innerHTML = `Processes for Application of the Material</br>(acc. AIPS)</br>After MOD specifying use of AIPS for new designs:`;

divColPross1.appendChild(pAIPIpross);
divColAntet1.appendChild(pAIPIAntet);

let divColPross2 = document.createElement('div')
divColPross2.classList.add('col');
let divColAntet2 = document.createElement('div')
divColAntet2.classList.add('col');

let p80Tpross = document.createElement('p');
p80Tpross.classList.add('fs-6');
p80Tpross.classList.add('text-center');
p80Tpross.innerHTML = `<span class="fw-bold">${PTCODES[e.id].pro_app_mat_80T}</span>`;
let p80TAntet = document.createElement('p');
p80TAntet.classList.add('fs-6');
p80TAntet.classList.add('text-center');
p80TAntet.innerHTML = `Processes for Application of the Material</br>(Acc. FA 80-T):`;

divColPross2.appendChild(p80Tpross);
divColAntet2.appendChild(p80TAntet);

divRowProos.appendChild(divColPross1);
divRowProos.appendChild(divColPross2);
divRowAntet.appendChild(divColAntet1);
divRowAntet.appendChild(divColAntet2);
divContPross.appendChild(divRowAntet);
divContPross.appendChild(divRowProos);

let pLimit = document.createElement('p');
pLimit.classList.add('fs-6');
pLimit.classList.add('mt-1');
pLimit.classList.add('mb-3');
pLimit.innerHTML = `Limitations: </br><span>${PTCODES[e.id].limit}</span>`;

let divBtn = document.createElement('div');
divBtn.classList.add('d-flex');
divBtn.classList.add('justify-content-end');
divBtn.classList.add('mb-3');
let btn = document.createElement('button');
btn.classList.add('btn');
btn.classList.add('btn-outline-primary');
btn.classList.add('btn-rounded');
btn.classList.add('bg-info');
btn.classList.add('py-2');
btn.classList.add('px-4');
btn.classList.add('disabled');
btn.setAttribute("onclick", `newDetailePage(${e.id})`);
btn.innerHTML = "see details"
if(PTCODES[e.id].Use_PAI) btn.classList.remove('disabled');

divBtn.appendChild(btn);

let divScroll = document.createElement('div')

divScroll.appendChild(h5);
divScroll.appendChild(h6);
divScroll.appendChild(pUse);
divScroll.appendChild(pUseDetail);
divScroll.appendChild(p);
divScroll.appendChild(pExemple);
divScroll.appendChild(pScheme);
divScroll.appendChild(divCont);
divScroll.appendChild(pMaterial);
divScroll.appendChild(divContPross);
divScroll.appendChild(pLimit);
divScroll.appendChild(divBtn);


divRight.appendChild(divScroll);

appContainer.appendChild(divRight);
}

function loadOSCodes(codes, e){
subNavbarSupportedContent.querySelectorAll('a')[0].classList.add('active');
subNavbarSupportedContent.querySelectorAll('a')[1].classList.remove('active');
subNavbarSupportedContent.querySelectorAll('a')[2].classList.remove('active');

divLeft.classList.add('col-4');
divLeft.classList.add('row');
divLeft.classList.add('mx-3');
divLeft.classList.add('mt-2');
divLeft.classList.add('d-flex');
divLeft.classList.add('justify-content-start');
divLeft.innerHTML= ""
appContainer.innerHTML= ""

codes.forEach((code, index) => {
let div = document.createElement('div');
div.classList.add('PTCodeNumber');
div.classList.add('border');
div.classList.add('border-3');
div.classList.add('border-primary');
div.classList.add('bg-info');
div.classList.add('m-1');
div.classList.add('rounded-circle');
div.classList.add('d-flex');
div.classList.add('flex-column');
div.classList.add('justify-content-center');
div.classList.add('align-items-center');
div.setAttribute("onclick", "getSpecificCode(this)");
div.setAttribute("id", index);

let h5 = document.createElement('h5');
h5.classList.add('h5');
h5.classList.add('text-light');
h5.classList.add('fw-bold');
h5.classList.add('mt-2');
h5.classList.add('mb-0');
h5.classList.add('p-0');
h5.innerText = code.Code;

let h6 = document.createElement('h6');

if(code.substitue == '' || code.substitue == undefined)h6.innerText = ''
else{
h6.innerText = code.substitue;
h6.classList.add('h6');
h6.classList.add('mt-1');
h6.classList.add('mb-1');
h6.classList.add('text-center');
}

let p = document.createElement('p');
p.classList.add('fs-6');
p.classList.add('text-center');
p.innerText = 'Env. Cat. ' + code.env_cat;

div.appendChild(h5);
div.appendChild(h6);
div.appendChild(p);

divLeft.appendChild(div);
})

appContainer.appendChild(divLeft);
}

function copyright(){
let cpr = document.querySelector('#copyright-text');
let d = new Date();
cpr.innerText = `\u00A9 ${1900 + d.getYear()} Copyright, Adrian Tudor`
}

document.addEventListener ("DOMContentLoaded", () => {
copyright();

PTCODES = JSON.parse(localStorage.getItem("PTCODES"));
PTMATERIALS = JSON.parse(localStorage.getItem("PTMATERIALS"));
PTPROCESSES = JSON.parse(localStorage.getItem("PTPROCESSES"));

if(PTCODES !== null){
loadDB.classList.add('d-none');
deleteDB.classList.remove('d-none');
loadOSCodes(PTCODES);
} else {
loadDB.classList.remove('d-none');
deleteDB.classList.add('d-none');
}

if(PTMATERIALS !== null){
subNavbarSupportedContent.querySelectorAll("label")[0].classList.add('d-none');
} else {
subNavbarSupportedContent.querySelectorAll("label")[0].classList.remove('d-none');
}

if(PTPROCESSES !== null){
subNavbarSupportedContent.querySelectorAll("label")[1].classList.add('d-none');
} else {
subNavbarSupportedContent.querySelectorAll("label")[1].classList.remove('d-none');
}
})

function loadMaterials(material){
subNavbarSupportedContent.querySelectorAll('a')[0].classList.remove('active');
subNavbarSupportedContent.querySelectorAll('a')[1].classList.add('active');
subNavbarSupportedContent.querySelectorAll('a')[2].classList.remove('active');

appContainer.innerHTML = '';

let divcontainer = document.createElement('div');
divcontainer.classList.add('container');
divcontainer.classList.add('ms-6');
divcontainer.classList.add('mt-2');
divcontainer.classList.add('w-75');
divcontainer.classList.add('border');
divcontainer.classList.add('border-3');
divcontainer.classList.add('rounded-2');
divcontainer.classList.add('border-dark');
divcontainer.classList.add('bg-light');

material.forEach(mat => {

let divrow1 = document.createElement('div');
divrow1.classList.add('row');
divrow1.classList.add('MatCodeNumber');
divrow1.classList.add('pt-3');
divrow1.classList.add('pb-4');
divrow1.classList.add('border-bottom');
divrow1.classList.add('border-2');
divrow1.classList.add('border-dark');

let divcol1 = document.createElement('div')
divcol1.classList.add('col-1');

let h5 = document.createElement('h5');
h5.classList.add('h4');
h5.classList.add('ps-3');
h5.innerHTML = `<span class="fw-bold">${mat.ref}</span>`
divcol1.appendChild(h5);

let divcol2 = document.createElement('div')
divcol2.classList.add('col-4');
divcol2.classList.add('text-center');

let h6 = document.createElement('h6');
h6.classList.add('h6');
h6.innerHTML = `Material Designation:</br></br><span class="fw-bold">${mat.mat_des}</span>`
divcol2.appendChild(h6);

let divcol3 = document.createElement('div')
divcol3.classList.add('col');

let h6rem = document.createElement('h6');
h6rem.classList.add('h5');
h6rem.innerHTML = `Remark:</br><span class="fw-bold">${mat.remark}</span>`
divcol3.appendChild(h6rem);



divrow1.appendChild(divcol1);
divrow1.appendChild(divcol2);
divrow1.appendChild(divcol3);

let divrow2 = document.createElement('div');
divrow2.classList.add('row');
divrow2.classList.add('pt-3');
divrow2.classList.add('mt-3');
divrow2.classList.add('ps-0');
divrow2.classList.add('border-1');
divrow2.classList.add('border-dark');


let divcol5 = document.createElement('div')
divcol5.classList.add('col-3');
divcol5.classList.add('ms-4');

let h6ref = document.createElement('h6');
h6ref.classList.add('h6');
h6ref.innerHTML = `TN reference</br>or</br>Material specification:`;

divcol5.appendChild(h6ref);

mat.reference.forEach(ref => {
let h6 = document.createElement('h6');
h6.classList.add('h5');
h6.innerHTML = `<span class="fw-bold">${ref}</span>`

divcol5.appendChild(h6);
})

let divcol4 = document.createElement('div')
divcol4.classList.add('col-3');


let h6ite = document.createElement('h5');
h6ite.classList.add('h6');
h6ite.classList.add('ps-3');
h6ite.innerHTML = `ITEM</br>(Equivalent or substitute)</br></br><span class="fw-bold">${mat.item}</span>`
divcol4.appendChild(h6ite);

let divcol6 = document.createElement('div')
divcol6.classList.add('col');

let h6mat = document.createElement('h6');
h6mat.classList.add('h5');
h6mat.innerHTML = `Material:</br>`
divcol6.appendChild(h6mat);

mat.material.forEach(mat => {
let h6 = document.createElement('h6');
h6.classList.add('h5');
h6.innerHTML = `<span class="fw-bold">${mat}</span>`

divcol6.appendChild(h6);
})

divrow2.appendChild(divcol5);
divrow2.appendChild(divcol4);
divrow2.appendChild(divcol6);

divrow1.appendChild(divrow2);

divcontainer.appendChild(divrow1);


})

appContainer.appendChild(divcontainer);
}

function loadProcesses(processes){
subNavbarSupportedContent.querySelectorAll('a')[0].classList.remove('active');
subNavbarSupportedContent.querySelectorAll('a')[1].classList.remove('active');
subNavbarSupportedContent.querySelectorAll('a')[2].classList.add('active');

appContainer.innerHTML = '';

let divcontainer = document.createElement('div');
divcontainer.classList.add('container');
divcontainer.classList.add('ms-6');
divcontainer.classList.add('mt-2');
divcontainer.classList.add('w-75');
divcontainer.classList.add('border');
divcontainer.classList.add('border-3');
divcontainer.classList.add('rounded-2');
divcontainer.classList.add('border-dark');
divcontainer.classList.add('bg-light');

processes.forEach(proce => {

let divrow1 = document.createElement('div');
divrow1.classList.add('row');
divrow1.classList.add('ProceCodeNumber');
divrow1.classList.add('pt-3');
divrow1.classList.add('pb-4');
divrow1.classList.add('border-bottom');
divrow1.classList.add('border-2');
divrow1.classList.add('border-dark');

let col1 = document.createElement('div');
col1.classList.add('col-1');
col1.classList.add('text-center');

let h5 = document.createElement('h5');
h5.classList.add('h-5');
h5.innerHTML = `<span class="fw-bold">${proce.ref}</span>`

col1.appendChild(h5);

divrow1.appendChild(col1);

let col2 = document.createElement('div');
col2.classList.add('col-6');


let h6 = document.createElement('h6');
h6.classList.add('h-6');
h6.innerHTML = `DESIGNATIONS</br><span class="fw-bold">${proce.designation}</span>`

col2.appendChild(h6);

divrow1.appendChild(col2);

let col3 = document.createElement('div');
col3.classList.add('col');
col3.classList.add('text-center');

let p = document.createElement('p');
p.classList.add('fs-6');
p.innerHTML = `Remarks</br><span class="fw-bold">${proce.remark}</span>`

col3.appendChild(p);

divrow1.appendChild(col3);

let divrow2 = document.createElement('div');
divrow2.classList.add('row');
divrow2.classList.add('pt-4');
divrow2.classList.add('justify-content-around');
divrow2.classList.add('d-flex');


let col4 = document.createElement('div');
col4.classList.add('col-4');
col4.classList.add('text-start');


let h680T = document.createElement('h6');
h680T.classList.add('h-6');
h680T.innerHTML = `AIRBUS PROCESS`;

col4.appendChild(h680T);

proce.air_proc_80T.forEach(proce => {

let p = document.createElement('p');
p.classList.add('fs-5');
p.classList.add('m-0');
p.innerHTML = `<span class="fw-bold">${proce}</span>`

col4.appendChild(p);
})

divrow2.appendChild(col4);

let col5 = document.createElement('div');
col5.classList.add('col-4');
col5.classList.add('text-end');


let h6AIPS = document.createElement('h6');
h6AIPS.classList.add('h-6');
h6AIPS.innerHTML = `AIRBUS PROCESS`;

col5.appendChild(h6AIPS);

proce.air_proc_AIPS.forEach(proce => {

let p = document.createElement('p');
p.classList.add('fs-5');
p.classList.add('m-0');
p.innerHTML = `<span class="fw-bold">${proce}</span>`

col5.appendChild(p);
})
divrow2.appendChild(col5);

divrow1.appendChild(divrow2);

divcontainer.appendChild(divrow1);
})

appContainer.appendChild(divcontainer);
}