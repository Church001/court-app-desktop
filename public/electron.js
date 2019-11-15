const electron = require("electron");
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu } = electron;
app.setName('E-CAR');
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 1220,
    height: 800,
    minWidth: 1220,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
      webSecurity: false

    }
  });
  mainWindow.loadURL(
  isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
  // setMainMenu();
}
//listent to app to be ready
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
  app.quit();
}
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// // if mac add an empty object to menu
// if(process.platform == 'darwin'){
//   mainMenuTemplate.unshift({});
// }
// //Add developers tools if not in production
// if(process.env.NODE_ENV !== 'production'){
//   mainMenuTemplate.push({
//     label: 'Developer Tools',
//     subMenu:[
//       {
//         label: 'Toggle DevTools',
//         click(item, focusedWindow){
//           focusedWindow.toggleDevTools();
//         }
//       },
//       {
//         role: 'reload'
//       }
//     ]
//   });
// }

function setMainMenu() {
  const template = [
    {
      // { role: 'appMenu' }
    label: app.getName(),
      submenu: [
        {
          label: 'Close',
          accelerator: process.platform == 'darwin' 
          ? 'Command+Q' 
          : 'Ctrl+Q',
          click(){
            console.log({appname: app.getName()});
            app.quit();
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
