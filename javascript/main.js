function copyright(){
    let cpr = document.querySelector('#copyright-text');
    let d = new Date();
    cpr.innerText = `\u00A9 ${1900 + d.getYear()} Copyright, Adrian Tudor`
}

document.addEventListener ("DOMContentLoaded", () => {
    copyright();
})