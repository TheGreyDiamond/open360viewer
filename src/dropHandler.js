document.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();
  document.getElementById("fakeDropzone").style.display = "none";
  document.getElementById("loadingBig").style.display = "block";
  document.getElementById("state").innerHTML =
    "Loading file. If this stays empty try another file.";
  const superFile = event.dataTransfer.files[0].path;
  document.getElementById("title").innerHTML = "open360viewer - "  + superFile
  FileType.fromFile(superFile).then((type) => {
    type = type["mime"].split("/")[0];
    if (type == "image") {
      loadImageFromSource(superFile);
    } else if (type == "video") {
      loadVideoFromSource(superFile);
    }
  });
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener("dragenter", (event) => {
  console.log("File is in the Drop Space");
});

document.addEventListener("dragleave", (event) => {
  console.log("File has left the Drop Space");
});
