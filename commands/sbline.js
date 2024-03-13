function calculateByteLength(str) {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) <= 127) {
            byteLength += 1;
        } else {
            byteLength += 2;
        }
    }
    return byteLength;
}
term.onData((data) => {
    function deltext() {
        let oldl = calculateByteLength(text);
        if (oldl == 0) return;
        text = text.slice(0, -1);
        pushMessage("[D [D", false);
        if (oldl > calculateByteLength(text) + 1) pushMessage(`[D [D`, false);
        if (text.length == 0) return;
        if (Math.floor(oldl / term.cols) == oldl / term.cols) {
            pushMessage(`[A`, false);
            pushMessage(`${Array(term.cols - 1).fill("[C").join("")} `, false);
            pushMessage(`${Array(term.cols - 1).fill("[C").join("")}`, false);
            pushMessage(`${(oldl > calculateByteLength(text) + 1) ? "[D [D" : ""}`, false)
        }
    }
    if (canType) {
        if (data.startsWith("")) {
            if (data == "[A") {
                commandindex += 1;
                if (commandindex > commandhistory.length) commandindex = commandhistory.length;
                function donea() {
                    text = commandhistory[commandhistory.length - commandindex] ? commandhistory[commandhistory.length - commandindex] : '';
                    pushMessage(`\r${text}`, false)
                }
                function nexta() {
                    deltext()
                    if (text == "") {
                        donea()
                    } else nexta()
                }
                nexta()
            } else if (data == "[B") {
                commandindex = Math.max(commandindex - 1, 0);
                function doneb() {
                    text = commandhistory[commandhistory.length - commandindex] ? commandhistory[commandhistory.length - commandindex] : '';
                    pushMessage(`${text}`, false);
                }
                function nextb() {
                    deltext()
                    if (text == "") {
                        doneb()
                    } else nextb()
                }
                nextb()
            }
        } else {
            if (data == atob("DQ")) {
                pushMessage('\x1b[0m');
                (async () => {
                    canType = false
                    let cmd = text.trim().split(" ");
                    if (text.trim() !== '') {
                        commandindex = 0
                        if (commandhistory[Math.max(commandhistory.length - 1, 0)] !== text) commandhistory.push(text)
                        if (COMMANDS[cmd[0]]) {
                            let runcmd = cmd.shift();
                            try {
                                await COMMANDS[runcmd].run(cmd);
                            } catch (err) {
                                pushMessage(`\x1B[91mKernel error while executing command: ${err.message}\x1B[0m`)
                            }
                        } else pushMessage("\x1B[37mUnknow Command.\x1B[0m")
                    }
                    text = "";
                    canType = true
                    pushMessage("\x1b[92m", false)
                })()
            } else if (data == atob("fw")) {
                deltext()
            } else {
                text += data
                pushMessage(data, (Math.floor(calculateByteLength(text) / term.cols) == calculateByteLength(text) / term.cols))
            }
        }
    }
})
setTimeout(() => {
    document.getElementsByClassName("xterm-char-measure-element")[0].style.display = 'none';
}, 10)
var commandhistory = [];
var commandindex = 0;
var canType = true
var text = ""

function getRandomItemFromArray(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
function pushMessage(arg, enter = true) {
    term.write(`${arg}${enter ? "\n\r" : ""}`)
}

COMMANDS.help = {
    run: (args) => {
        if (args[0]) {
            if (COMMANDS[args[0]]) {
                pushMessage(`\x1B[97m${args[0]}\x1B[0m`);
                pushMessage("");
                pushMessage(COMMANDS[args[0]]["moreHelp"]);
                pushMessage("");
                pushMessage(`Usage: ${args[0]} ${COMMANDS[args[0]].usage}`);
            } else pushMessage("\x1B[37mUnknow Command.\x1B[0m")

        } else {
            for (let k in COMMANDS) {
                pushMessage(` ${k}${Array(10 - k.length).fill(" ").join("")}${COMMANDS[k].help}`)
            }
            pushMessage("");
            pushMessage("Use \x1B[37mhelp [command]\x1B[0m to show more help...");
        }
    },
    help: 'Show help',
    moreHelp: 'Display a help list. If you know the command, you can display detailed help and usage for the corresponding command.',
    usage: '[command]'
}
