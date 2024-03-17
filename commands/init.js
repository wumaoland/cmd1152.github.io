setTimeout(()=>{
  if (!whoami.includes(infoDiv.innerText.substring(2))) return;
  loadpage.style.opacity = 0;
  setTimeout(()=>{
    document.getElementById('terminal').style.opacity = 1;
    term.focus()
    loadpage.style.display = "none";
    clearInterval(whou)
  }, 500);
},3000);