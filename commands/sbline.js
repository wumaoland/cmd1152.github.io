﻿function calculateByteLength(str) {
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
var tabs = [];
var tabsIndex = 0;
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
    function settext(texts) {
        function donea() {
            text = texts
            pushMessage(`\r${texts}`, false)
        }
        function nexta() {
            deltext()
            if (text == "") {
                donea()
            } else nexta()
        } 
        nexta()
    }
    if (canType) {
        if (data.startsWith("")) {
            if (data == "[A") {
                commandindex += 1;
                if (commandindex > commandhistory.length) commandindex = commandhistory.length;
                settext(commandhistory[commandhistory.length - commandindex] ? commandhistory[commandhistory.length - commandindex] : '');
            } else if (data == "[B") {
                commandindex = Math.max(commandindex - 1, 0);
                settext(commandhistory[commandhistory.length - commandindex] ? commandhistory[commandhistory.length - commandindex] : '');
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
            } else if (data == atob("CQ")) {
                if (text.split(" ").length == 1) {
                    if (tabs.length > 0) {
                        tabsIndex += 1;
                        if (tabsIndex == tabs.length) tabsIndex = 0;
                        if (tabs[tabsIndex]) settext(tabs[tabsIndex]);
                    } else {
                        tabs = [];
                        for (let k in COMMANDS) {
                            if (k.startsWith(text)) tabs.push(k);
                        }
                        tabsIndex = 0;
                        if (tabs[tabsIndex]) settext(tabs[tabsIndex]);
                    }
                }
            } else {
                tabs = [];
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
            let maxlength = 0
            let sortedCommands = Object.keys(COMMANDS).sort((a, b) => a.localeCompare(b))
            for (let k in COMMANDS) {
                if (k.length > maxlength) maxlength = k.length;
            }
            sortedCommands.forEach(k=>{
                pushMessage(` ${k}${Array(maxlength - k.length).fill(" ").join("")} ${COMMANDS[k].help}`)
            })
            pushMessage("");
            pushMessage("Use \x1B[37mhelp [command]\x1B[0m to show more help...");
        }
    },
    help: 'Show help',
    moreHelp: 'Display a help list. If you know the command, you can display detailed help and usage for the corresponding command.',
    usage: '[command]'
}
