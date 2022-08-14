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
    app.console.log(`dirname = ${app.dirname}`);
    app.console.log(`cwd = ${app.cwd}`);
    for (const type of ['chrome', 'node', 'electron'])
        setText(`${type}-version`, process.versions[type]);
}
