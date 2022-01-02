const { app, BrowserWindow, protocol, Menu, dialog } = require("electron");
const url = require("url");
const path = require("path");

let win;
const isMac = process.platform === "darwin";

const template = [
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        accelerator: "CmdOrCtrl+O",
        click: function () {
          dialog
            .showOpenDialog({ properties: ["openFile", "multiSelections"] })
            .then(function (data) {
              console.log(data);
              win.webContents.send("FileData", data);
            });
        },
      },
      isMac ? { role: "close" } : { role: "quit" },
    ],
  },
  {
    role: "help",
    submenu: [
      { role: "toggleDevTools" },
      {
        label: "About",
        click: async () => {
          createStartupInfo();
        },
      },
    ],
  },
];

function createStartupInfo() {
  // aka. loading screen
  const win2 = new BrowserWindow({
    width: 500,
    height: 400,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win2.setFullScreen(false);
  win2.setAlwaysOnTop(false);
  win2.loadFile("ui_templates/about.html");
  win2.show();
  return win2;
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // win.webContents.openDevTools();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on("ready", function () {
  // aWin2 = createStartupInfo();
  createWindow();
});
