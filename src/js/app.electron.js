const { app, BrowserWindow } = require('electron');

console.log(1);
app.on('window-all-closed', () => {
  app.quit()
});

app.on('ready', () => {
  app.mainWindow = new BrowserWindow();
  app.mainWindow.loadURL(`file://${__dirname}/index.html`);
});
app.on('error', (err) => {
console.log(err)
});
