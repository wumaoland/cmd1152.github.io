fetch('commands.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(text => {
    const commandNames = text.split('\n').map(name => name.trim());
    commandNames.forEach(name => {
      const script = document.createElement('script');
      script.src = `commands/${name}.js`;
      document.head.appendChild(script);
    });
    loadpage.style.opacity = 0;
    setTimeout(()=>{
      document.getElementById('terminal').style.opacity = 1;
      document.getElementById('terminal').style.display = "block";
      term.focus()
      loadpage.style.display = "none";
    }, 500);
  })
  .catch(error => {
    window.dispatchEvent(new ErrorEvent('error', {
      message: 'Unable to load command'
    }));
  });

const infoDiv = document.getElementById('infoDiv');
window.addEventListener('error', function(event) {
  const message = event.message || 'Unknown error';
  infoDiv.innerText = 'Core Error: ' + message;
  document.getElementById('terminal').style.opacity = 0;
  loadpage.style.display = "flex";
  setTimeout(()=>{
    loadpage.style.opacity = 1;
    document.getElementById('terminal').style.display = "none";
  }, 500)
  setTimeout(()=>{
    infoDiv.innerText = "About to overload";
    setTimeout(()=>{location.reload()},1000);
  }, 3000);
});

const term = new Terminal({
  cursorStyle: 'block',
  cursorColor: '44ff00',
  cursorBlink: true,
});
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();
window.onresize = () => { 
  fitAddon.fit(); 
  try {
    if (text) {
      text = "";
      pushMessage("\n\r\x1B[91mAdjust window during input? This is not a good choice\x1b[92m")
    }
  } catch (e) {}
}

        function getRandomItemFromArray(arr) {
            var randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
        }
        function pushMessage(arg, enter = true) {
            term.write(`${arg}${enter ? "\n\r" : ""}`)
        }
var COMMANDS = {}
