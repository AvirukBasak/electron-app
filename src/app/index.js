const {
    setText,
    setHTML,
    app
} = require('../main/interface/ipcRenderer.js');

// front end logic entry point
const main = (argc, argv) => {
    app.console.log(`dirname = ${app.dirname}`);
    app.console.log(`cwd = ${app.cwd}`);
    for (const type of ['chrome', 'node', 'electron'])
        setText(`${type}-version`, process.versions[type]);
}

module.exports = {
    main
};
