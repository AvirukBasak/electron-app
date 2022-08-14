const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('./interface/ipcMain.js');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile('src/ui/index.html');
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});
