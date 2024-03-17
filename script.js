fetch('commands.txt')
  .then(response => {
    if (!response.ok) {
      window.dispatchEvent(new ErrorEvent('error', {
        message: '无法载入命令列表'
      }));
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
  })
  .catch(error => {
    window.dispatchEvent(new ErrorEvent('error', {
      message: '无法载入命令列表'
    }));
  });
window.addEventListener('error', function(event) {
  const message = event.message || 'Unknown error';
  infoDiv.innerText = '内核错误：' + message;
  document.getElementById('terminal').style.opacity = 0;
  loadpage.style.display = "flex";
  setTimeout(()=>{
    loadpage.style.opacity = 1;
    document.getElementById('terminal').style.display = "none";
  }, 500)
  setTimeout(()=>{
    infoDiv.innerText = "全部重载";
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
      pushMessage("\n\r\x1B[91m在输入时改变窗口大小并不可取\x1b[92m")
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
