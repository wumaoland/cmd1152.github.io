COMMANDS["hc-status"] = {
    run: (args) => {
        return new Promise(resolve => {
            let ws = new WebSocket("wss://hack.chat/chat-ws");
            pushMessage("Connect to Server...\r", false);
            ws.onopen = () => {
                ws.send(`{"cmd":"session","isBot":false}`);
            }
            ws.onmessage = (e) => {
                var hc = JSON.parse(e.data);
                if (hc.cmd == "session") {
                    pushMessage("--- HackChat status ---");
                    pushMessage("");
                    pushMessage("+--------------------+");
                    pushMessage("| Channel     | User |");
                    pushMessage("+--------------------+")
                    for (let k in hc.public) {
                        pushMessage(`| ${k}${Array(12 - k.length).fill(" ").join("")}| ${hc.public[k].toString()}${Array(5 - hc.public[k].toString().length).fill(" ").join("")}|`, true, true)
                    }
                    pushMessage("+--------------------+");
                    pushMessage("");
                    pushMessage(`Online Users: ${hc.users.toString()}`);
                    pushMessage(`Online Channels: ${hc.chans.toString()}`);
                } else pushMessage(`\x1B[91mFailed to correctly obtain the status of hc: ${e.data}\x1B[0m`, true, true)
                ws.close();
                resolve();
            }
            ws.onerror = () => {
                pushMessage(`\x1B[91mFailed to correctly obtain the status of hc: \x1B[0m\x1B[31mUnable to connect to server\x1B[0m`, true, true)
                resolve();
            }
        });
    },
    help: 'Display partially public HC channel information',
    moreHelp: 'Connect to the WebSocket of HC and obtain the number of online users and channels of HC, as well as the number of online users of some public channels.',
    usage: ''
}