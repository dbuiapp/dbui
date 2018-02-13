import 'app-module-path/cwd';
import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';
//import './ipc';

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  app.mainWindow = new BrowserWindow();
  app.mainWindow.loadURL(`file://${resolve(__dirname, '..')}/index.html`);
});

app.on('error', (err) => {
  console.trace(err);
});
