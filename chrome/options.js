document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("rm-room").addEventListener('click',
    function() {
      rmRoom();
    });
  document.getElementById("set-room").addEventListener('click',
    function () {
      setRoom(document.getElementById("room-file").files[0])
    }, false);
});
