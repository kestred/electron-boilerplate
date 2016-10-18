import { app, BrowserWindow } from 'electron';

if (require('electron-squirrel-startup')) { app.quit(); }

let mainWindow: Electron.BrowserWindow | null;
app.on('ready', function() {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', function() { mainWindow = null; });
  mainWindow.webContents.openDevTools();
});
app.on('window-all-closed', function() {
  app.quit();
});
