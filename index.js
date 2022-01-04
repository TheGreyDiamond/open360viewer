const {
  app,
  BrowserWindow,
  protocol,
  Menu,
  dialog,
  ipcMain,
} = require("electron");
const url = require("url");
const path = require("path");
const FileType = require("file-type");
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
              if (data.canceled == false) {
                FileType.fromFile(data.filePaths[0]).then((type) => {
                  data.type = type["mime"].split("/")[0];
                  win.webContents.send("FileData", data);
                });
              }
              // console.log(await FileType.fromFile(data));
              //  win.webContents.send("FileData", data);
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
  win2.loadFile(path.join(__dirname, "dist/ui_templates/about.html"));
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
      pathname: path.join(__dirname, "dist/ui_templates/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  // win.webContents.openDevTools();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on("ready", function () {
  createWindow();

  ipcMain.on("synchronous-message", (event, arg) => {
    console.log(arg);
    if (arg == "openFile") {
      dialog
        .showOpenDialog({ properties: ["openFile", "multiSelections"] })
        .then(function (data) {
          FileType.fromFile(data.filePaths[0]).then((type) => {
            data.type = type["mime"].split("/")[0];
            win.webContents.send("FileData", data);
          });
        });
    } else if (arg == "resize") {
      // A really ugly hack to force the window to update, so the canvas shows up
      win.setSize(win.getSize()[0] + 1, win.getSize()[1]);
      setTimeout(function () {
        win.setSize(win.getSize()[0] + 1, win.getSize()[1]);
      }, 200);
    }
    event.returnValue = "";
  });
});
