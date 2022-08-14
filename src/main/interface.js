const { ipcMain, ipcRenderer } = require('electron');

if (ipcRenderer?.on)
{
    var TEXT_ELEMENTS = [];
    var HTML_ELEMENTS = [];

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
        app.console.error(`preload.js: text element ${varname} not found`);
    }

    // sets HTML values to DOM var elements
    const setHTML = (varname, html) => {
        for (const el of HTML_ELEMENTS)
            if (el && el.hasAttribute(varname)) {
                el.innerHTML = html;
                return;
            }
        app.console.error(`preload.js: html element ${varname} not found`);
    }

    const app = {
        argc: process.argv.length,
        argv: process.argv,
        dirname: __dirname,
        cwd: process.cwd,
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
        ipcMain,
        ipcRenderer,
        TEXT_ELEMENTS,
        HTML_ELEMENTS,
        populatePreloadElementList,
        setText,
        setHTML,
        app
    };
}

if (ipcMain?.on)
{
    // frontend-backend interface
    ipcMain.on('app.console.log', (event, msg) => console.log(msg));
    ipcMain.on('app.console.warn', (event, msg) => console.warn(msg));
    ipcMain.on('app.console.error', (event, msg) => console.error(msg));
    ipcMain.on('app.console.clear', (event) => console.clear());

    ipcMain.on('app.file.read', (event, path) => {
        fs.readFile(path, (err, data) => {
            if (err) data = null;
            ipcMain.send('app.file.read', data);
        });
    });

    ipcMain.on('app.file.write', (event, path, data) => fs.writeFile(path, data));

    module.exports = {
        ipcMain
    };
}
