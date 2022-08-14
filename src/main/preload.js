const { populatePreloadElementList, app } = require('./interface/ipcRenderer.js');
const { main } = require('../app/index.js');

window.addEventListener('DOMContentLoaded', (windw, ev) => {
    populatePreloadElementList();
    main(app.argc, app.argv);
});
