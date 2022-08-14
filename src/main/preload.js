let TEXT_ELEMENTS = [];
let HTML_ELEMENTS = [];

const populatePreloadElementList = () => {
    TEXT_ELEMENTS = document.querySelectorAll('txt');
    HTML_ELEMENTS = document.querySelectorAll('var');
}

// sets text values to DOM var elements
const setText = (varname, text) => {
    for (const el of TEXT_ELEMENTS)
        if (el && el.hasAttribute(varname)) {
            el.innerText = text;
            return;
        }
    console.error(`preload.js: text element ${varname} not found`);
}

// sets HTML values to DOM var elements
const setHTML = (varname, html) => {
    for (const el of HTML_ELEMENTS)
        if (el && el.hasAttribute(varname)) {
            el.innerHTML = html;
            return;
        }
    console.error(`preload.js: html element ${varname} not found`);
}

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    populatePreloadElementList();
    for (const type of ['chrome', 'node', 'electron'])
        setText(`${type}-version`, process.versions[type]);
});
