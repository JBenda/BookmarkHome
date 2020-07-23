function createLink(str) {
  if (!String(str).startsWith('http')) {
    str = 'https://' + str;
  }
  return str;
}
document.addEventListener("click", (e) => {
  elm = e.target;
  link = elm.attributes.getNamedItem('bookmark');
  while(elm.id != 'room' && link == null) {
    elm = elm.parentElement;
    link = elm.attributes.getNamedItem('bookmark');
  }
  if (link != null) {
    window.open(createLink(link.value));
  }
});

document.addEventListener("DOMContentLoaded", function(){
  loadRoom(function(data){
    room_svg = document.getElementById("room-svg");
    if (!data.room) {
      room_svg.addEventListener("load", function() {
        room_svg.parentElement.replaceChild(room_svg.contentDocument.documentElement.cloneNode(true), room_svg);
      });
      return;
    }
    para = document.createElement("div");
    para.id = "room_svg";
    para.innerHTML = data.room;
    document.getElementById("room").replaceChild(para, room_svg);
  });

});
