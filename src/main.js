const { ipcRenderer, ipcMain } = require("electron");

let currentIndex = -1;

ipcRenderer.on("FileData", function (event, data) {
  console.log(data);
  if (data.canceled == false) {
    // newPano(data.filePaths[0])
    document.getElementById("fakeDropzone").style.display = "none";
    document.getElementById("loadingBig").style.display = "block";
    document.getElementById("state").innerHTML =
      "Loading file. If this stays empty try another file.";
      document.getElementById("title").innerHTML = "open360viewer - "  + data.filePaths[0];
    if (data.type == "image") {
      loadImageFromSource(data.filePaths[0]);
    } else if (data.type == "video") {
      loadVideoFromSource(data.filePaths[0]);
    }
    makeFileIndex(data.filePaths[0]);
  }
  
});

function getPathWithoutExtension(path) {
  return path.substring(0, path.lastIndexOf("/")) || path.substring(0, path.lastIndexOf("\\"));
}

function makeFileIndex(fullPath) {
  fileName = fullPath.substring(fullPath.lastIndexOf("/")) || fullPath.substring(0, fullPath.lastIndexOf("\\"));
  path = getPathWithoutExtension(fullPath);
  const result = ipcRenderer.sendSync("synchronous-message", "indexFolder;" + path);
  const finalResult = [];
  for(elm in result) {
    const curr = result[elm];
    finalResult.push(path + curr)
  }
  currentIndex = fin
  console.log(finalResult)
}

function openFile() {
  ipcRenderer.sendSync("synchronous-message", "openFile");
}

var viewer = new Marzipano.Viewer(document.getElementById("pano2"));
function newPano(path) {
  var sourceIm = Marzipano.ImageUrlSource.fromString(path);
  // Create scene.
  var scene = viewer.createScene({
    source: sourceIm,
    geometry: geometry,
    view: view,
    pinFirstLevel: true,
  });
  scene.switchTo();
  setTimeout(function () {
    scene.switchTo();
  }, 20);
  ipcRenderer.sendSync("synchronous-message", "resize");
  document.getElementById("video-controls").style.display = "none";
}

var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(
  4000,
  (120 * Math.PI) / 180
);
var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

function loadVideoFromSource(path) {
  setTimeout(function () {
    multiResVideo.setResolutionIndex(1, path, loadingDone);
  }, 20);
}

function loadingDone(state) {
  if (!state) {
      document.getElementById("loadingBig").style.display = "none";
      ipcRenderer.sendSync("synchronous-message", "resize");
      document.getElementById("pano").style.display = "block";
      document.getElementById("pano2").style.display = "none";
      document.getElementById("video-controls").style.display = "block";
  }
}
