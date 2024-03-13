loadpage.style.opacity = 0;
setTimeout(()=>{
  document.getElementById('terminal').style.opacity = 1;
  document.getElementById('terminal').style.display = "block";
  term.focus()
  loadpage.style.display = "none";
}, 500);