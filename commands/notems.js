COMMANDS.notems = {
    run: (args) => {
        return new Promise(resolve => {
            window.dispatchEvent(new ErrorEvent('error', {
                message: '并没有错误，你是个错误'
            }));
            let method = args[0];
            let fetbody = null;
            let fetthod = "GET";
            let feturls = "/notems"
            if (args[1]) {
                feturls += `?${encodeURIComponent(args[1])}`
                if (method.toLocaleLowerCase() == "set") {
                    fetbody = args
                    fetbody.shift();
                    fetbody.shift();
                    fetbody.join(" ");
                    fetthod = "POST"
                } else if (method.toLocaleLowerCase() != "get") {
                    pushMessage("\x1B[91m未知操作\x1B[0m", true, true);
                    resolve();
                }
                fetch(feturls, {
                    "body": fetbody,
                    "method": fetthod,
                    "mode": "cors"
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            pushMessage("\x1B[91操作失败:\x1B[0m", true, true);
                            if (response.status == 429) {
                                pushMessage("\x1B[91m操作过快\x1B[0m", true, true);
                            } else pushMessage("\x1B[91m服务器出错\x1B[0m", true, true);
                            resolve();
                        }
                    })
                    .then(e => {
                        if (fetthod == "GET") {
                            pushMessage(e)
                        }
                    })
                    .finally(() => {
                        resolve();
                    })
            } else {
                pushMessage("\x1B[91m未知路径\x1B[0m", true, true);
                resolve();
            }
        })
    },
    help: '读写note.ms页面',
    moreHelp: '读写note.ms页面',
    usage: '[set/get] [path] <text(允许空格)>'
}