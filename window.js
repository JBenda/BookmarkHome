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
console.log('Start');
document.getElementById('room-svg').addEventListener("load", () => {
  console.log('loaded');
  const e = document.getElementById('room-svg');
  e.parentElement.replaceChild(e.contentDocument.documentElement.cloneNode(true), e);
});
