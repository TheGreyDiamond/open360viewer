function encode_html(rawStr) {
  var encodedStr = rawStr.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });

  return encodedStr;
}

function does_list_contain(list, needle) {
  if (list.indexOf(needle) >= 0) {
    return true;
  } else {
    return false;
  }
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

function createModalPopup(titel, body, actions){
  // Creates a modal popup and makes sure only one layer of "darking" is applied.
  // Returns the modals id
  modalsList = JSON.parse(document.getElementById("modals").innerHTML)
  const idTime = Date.now();
  modalsList.open.push(idTime);
  
  let modal = document.getElementById("mainModal");
  modal.style.display = "block";
  // modal.innerHTML += '<div class="modal-content" id="modal-' + String(idTime) + '">  <span class="close" onclick="closeModal(' + String(idTime) + ')">&times;</span>' + body + '<br><button>Shutdown</button><button>Lock</button><button onclick="">Close Software</button></div>'
  modal.innerHTML += '<div class="modal-content" id="modal-' + String(idTime) + '"> \
   <div class="modal-header"> \
   <span class="close" onclick="closeModal(' + String(idTime) + ')">&times;</span> \
   <h2>' + titel + '</h2>\
   </div>\
   <div class="modal-body"><p>' + body + '</p></div>  \
   <div class="modal-footer"><center>' + actions + '</center></div> \
   </div>'
  document.getElementById("modals").innerHTML = JSON.stringify(modalsList)
  return(idTime)
}

function closeModal(id){
  modalsList = JSON.parse(document.getElementById("modals").innerHTML)
  document.getElementById("modal-" + String(id)).remove()
  modalsList.open.pop(String(id))
  document.getElementById("modals").innerHTML = JSON.stringify(modalsList)
  if(modalsList.open.length == 0){
    let modal = document.getElementById("mainModal");
    modal.style.display = "none";
  }
}