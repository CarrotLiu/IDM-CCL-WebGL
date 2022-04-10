import { app, BrowserWindow, ipcMain } from 'electron';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as path from "path";


// be sure to upload StandardFirmataPlus to your board
// and run 'npm run rebuild' so johnny-five is compatible
const five = require('johnny-five');
const board = new five.Board({
  // name of the port your arduino is connected to
  // on mac this is probably "dev/tty/[something]"
  // on windows this is probably "COM[number]"
    port: "COM3",
  repl: false
});

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);


  board.on("ready", () => {
    let led = new five.Led(13);
    led.blink(1000);
    // ipcMain.handle('write:LEDStatus', (event: any ,value: 1|0) => {
    //   console.log(value)
    //   if (value === 0) {
    //     led.off()
    //   } else {
    //     led.on()
    //   }
    // })

    // let button = new five.Button(8);
    // button.on("press", () => {
    //   console.log("button pressed")
    //   const color = Math.round(Math.random() * 0xffffff);
    //   console.log(color)
    //   mainWindow.webContents.send('update-background', color)
    // })

    let potentiometer = new five.Sensor({
      pin: "A0",
      frequency: 250,
      threshold: 5
    });
    potentiometer.on("change", function () {
      console.log(this.value / 1200)
      mainWindow.webContents.send('update-sprite-x', this.value / 1200)
      
      // viewOne
    });
  })

//   setInterval(()=>{
// 	  const randBackground = Math.random() * 0xffffff
// 	  mainWindow.webContents.send('update-background', randBackground)
//   }, 2000)

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
