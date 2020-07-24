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
      browser.storage.sync.set({room: decoder.decode(data)}).then(
        success,
        fail
      );
    }, fail
  );
}

// return
function loadRoom(callback) {
  browser.storage.sync.get("room").then(callback, fail);
}

function rmRoom() {
  browser.storage.sync.remove("room");
}
