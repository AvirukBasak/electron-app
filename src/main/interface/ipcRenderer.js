const { ipcRenderer } = require('electron');

var VAR_ELEMENTS = [];

const populatePreloadElementList = () => {
    VAR_ELEMENTS = document.querySelectorAll('val');
}

/**
 * Sets innerText of a special HTML element <val valname></val>
 * @param { string } valname A name to refer to that <val> element
 * @param { string } text The text to be set
 */
const setText = (valname, text, flaghtml = false) => {
    for (const el of VAR_ELEMENTS)
        if (el && el.hasAttribute(valname)) {
            if (flaghtml)
                el.innerHTML = text;
            else
                el.innerText = text;
            return;
        }
    app.console.error(`preload.js: val element ${valname} not found`);
}

/**
 * Sets innerHTML of a special HTML element <val valname></val>
 * @param { string } valname A name to refer to that <val> element
 * @param { string } html The HTML string to be set
 */
const setHTML = (valname, html, flaghtml = true) => {
    setText(valname, html, flaghtml);
}

const app = {
    argc: process.argv.length,
    argv: process.argv,
    dirname: __dirname,
    cwd: process.cwd(),
    console: {
        log(msg) {
            ipcRenderer.send('app.console.log', msg.toString());
        },
        warn(msg) {
            ipcRenderer.send('app.console.warn', msg.toString());
        },
        error(msg) {
            ipcRenderer.send('app.console.error', msg.toString());
        },
        clear() {
            ipcRenderer.send('app.console.clear');
        }
    },
    file: {
        read(path, callback) {
            ipcRenderer.send('app.file.read', path);
            ipcRenderer.on('app.file.read', (event, data) => {
                if (callback)
                    callback(data);
            });
        },
        write(path, data) {
            ipcRenderer.send('app.file.write', path, data);
        }
    }
};

module.exports = {
    ipcRenderer,
    VAR_ELEMENTS,
    VAR_ELEMENTS,
    populatePreloadElementList,
    setText,
    setHTML,
    app
};
