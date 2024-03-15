loadpage.style.opacity = 0;
setTimeout(()=>{
  if (infoDiv.innerText != "Starting") return;
  document.getElementById('terminal').style.opacity = 1;
  term.focus()
  loadpage.style.display = "none";
}, 500);