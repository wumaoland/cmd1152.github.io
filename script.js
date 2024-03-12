let rotation = 25;
var svg_c = document.getElementById('svg_c');
var loadpage = document.getElementById('loadpage');
var rotation_c = setInterval(() => {
  rotation += 10;
  svg_c.setAttribute('transform', `rotate(${rotation} 53.0706 49.0405)`);
}, 10);
window.addEventListener('load', () => {
  loadpage.style.opacity = 0;
  setTimeout(()=>{
    clearInterval(rotation_c);
    loadpage.style.display = "none";
    term.focus();
  },500);
  document.getElementById('terminal').style.opacity = 1;
});