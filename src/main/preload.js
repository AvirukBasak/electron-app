const {
    populatePreloadElementList,
    setText,
    setHTML,
    app
} = require('./interface/ipcRenderer.js');

window.addEventListener('DOMContentLoaded', () => {
    populatePreloadElementList();
    main(app.argc, app.argv);
});

const main = (argc, argv) => {
    app.console.log(`arg count = ${argc}`);
    for (const type of ['chrome', 'node', 'electron'])
        setText(`${type}-version`, process.versions[type]);
}
