const { ipcMain } = require('electron');

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