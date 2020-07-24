// OPTIONAL BEGIN
// Shows url when hover for longer then `hover_time` over the item
const hover_time = 1000;
function addHover(node) {
  link = null;
  if (node.attributes) {
    link = node.attributes.getNamedItem('bookmark');
  }
  if(link) {
    span = document.createElement("span");
    span.classList.add('tooltiptext');
    text = document.createTextNode(link.value);
    span.appendChild(text);
    room = document.getElementById('room');
    room.appendChild(span);
    const rect = node.getClientRects()[0];
    const bb = span.getClientRects()[0];
    span.style.left = (rect.x + rect.width/2 - bb.width/2)+'px';
    span.style.top = (rect.y+rect.height/2 - bb.height/2)+'px';
    url = (' '+ link.value).slice(1); // deep copy
    node.addEventListener('mouseover', function(){
      span.timer = setTimeout(function() {
        span.style.visibility="visible";
      }, hover_time);
    })
    node.addEventListener('mouseout', function(e){
      if (document.elementFromPoint(e.clientX, e.clientY) != span) {
        span.style.visibility="hidden";
        clearTimeout(span.timer);
      }
    });
    span.addEventListener('mouseout', function(e){
      if(document.elementFromPoint(e.clientX, e.clientY) != node) {
        span.style.visibility="hidden";
        clearTimeout(span.timer);
      }
    })
    span.addEventListener('click', function(){
      wopen(url);
    })
  }

  if (!node.childNodes) { return; }
  node.childNodes.forEach(elm => addHover(elm));
}
// OPTIONAL END


function createLink(str) {
  if (!String(str).startsWith('http')) {
    str = 'https://' + str;
  }
  return str;
}

function wopen(link) {
  window.open(createLink(link));
}

document.addEventListener("click", (e) => {
  elm = e.target;
  link = elm.attributes.getNamedItem('bookmark');
  while(elm.id != 'room' && link == null) {
    elm = elm.parentElement;
    link = elm.attributes.getNamedItem('bookmark');
  }
  if (link != null) {
    wopen(link.value);
  }
});

function setDefaultRoom(type) {
  if(setDefaultRoom[type]) {
    return;
  }
  setDefaultRoom[type] = true;
  if(setDefaultRoom.ready && setDefaultRoom.active) {
    room_svg = document.getElementById("room-svg");
    new_svg = room_svg.contentDocument.documentElement.cloneNode(true);
    new_svg.id = "room_svg";
    room_svg.parentElement.replaceChild(new_svg, room_svg);

    addHover(new_svg);
  }
}
setDefaultRoom.ready = true;
setDefaultRoom.active = false;

document.getElementById('room-svg').addEventListener('load', function() {
    setDefaultRoom('ready');
});

document.addEventListener("DOMContentLoaded", function(){
  loadRoom(function(data){
    room_svg = document.getElementById("room-svg");
    // no room set -> use default room
    if (!data.room) {
      setDefaultRoom("active");
      return;
    }

    para = document.createElement("div");
    para.id = "room_svg";
    para.innerHTML = data.room;
    document.getElementById("room").replaceChild(para, room_svg);
    addHover(para);
  });

});
