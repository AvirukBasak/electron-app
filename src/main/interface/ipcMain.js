const { ipcMain } = require('electron');
const fs = require('fs');

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
ipcMain.on('app.file.append', (event, path, data) => fs.appendFile(path, data));

module.exports = {
    ipcMain
};
