import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import process from 'node:process';
import { registerModules } from './ipc';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, 'preload/index.js'),
      sandbox: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
    win.loadURL('http://localhost:5173');
  } else win.loadFile('dist/index.html');
};

app
  .whenReady()
  .then(() => registerModules())
  .then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
