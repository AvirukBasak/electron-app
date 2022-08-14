const { populatePreloadElementList, app, main } = require('../app/index.js');

window.addEventListener('DOMContentLoaded', (windw, ev) => {
    populatePreloadElementList();
    main(app.argc, app.argv);
});
