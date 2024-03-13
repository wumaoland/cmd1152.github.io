loadpage.style.opacity = 0;
setTimeout(()=>{
  document.getElementById('terminal').style.opacity = 1;
  term.focus()
  loadpage.style.display = "none";
}, 500);