COMMANDS["hc-status"] = {
    run: (args) => {
        return new Promise(resolve => {
            let ws = new WebSocket("wss://hack.chat/chat-ws");
            pushMessage("正在连接服务器...\r", false);
            ws.onopen = () => {
                ws.send(`{"cmd":"session","isBot":false}`);
            }
            ws.onmessage = (e) => {
                var hc = JSON.parse(e.data);
                if (hc.cmd == "session") {
                    pushMessage("--- HackChat 的状态 ---");
                    pushMessage("");
                    pushMessage("+--------------------+");
                    pushMessage("| 频道        | 用户 |");
                    pushMessage("+--------------------+")
                    for (let k in hc.public) {
                        pushMessage(`| ${k}${Array(12 - k.length).fill(" ").join("")}| ${hc.public[k].toString()}${Array(5 - hc.public[k].toString().length).fill(" ").join("")}|`, true, true)
                    }
                    pushMessage("+--------------------+");
                    pushMessage("");
                    pushMessage(`在线用户: ${hc.users.toString()}`);
                    pushMessage(`在线频道: ${hc.chans.toString()}`);
                } else pushMessage(`\x1B[91m无法理解: ${e.data}\x1B[0m`, true, true)
                ws.close();
                resolve();
            }
            ws.onerror = () => {
                pushMessage(`\x1B[91m无法连接至服务器\x1B[0m`, true, true)
                resolve();
            }
        });
    },
    help: '显示公开的HC信息',
    moreHelp: '通过WebSocket连接HC并使用session数据包列出HC的信息',
    usage: ''
}