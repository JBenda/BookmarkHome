function success() {
  console.log("updated Room");
}
function fail(err) {
  console.error(`failed to load room: ${err}`);
}
function setRoom(file) {
  file.arrayBuffer().then(
    function(data){
      const decoder = new TextDecoder("utf8");
      chrome.storage.local.set({room: decoder.decode(data)});
    }, fail
  );
}

// return
function loadRoom(callback) {
  chrome.storage.local.get(["room"],callback);
}

function rmRoom() {
  chrome.storage.local.remove("room");
}
