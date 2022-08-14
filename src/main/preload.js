const {
    populatePreloadElementList,
    setText,
    setHTML,
    app
} = require('./interface/ipcRenderer.js');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    app.console.log(app.argv);
    populatePreloadElementList();
    for (const type of ['chrome', 'node', 'electron'])
        setText(`${type}-version`, process.versions[type]);
});
