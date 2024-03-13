COMMANDS.notems = {
    run: (args) => {
        return new Promise(resolve => {
            window.dispatchEvent(new ErrorEvent('error', {
                message: 'Command disaster error'
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
                    pushMessage("\x1B[91mUnknow Method\x1B[0m", true, true);
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
                            pushMessage("\x1B[91moperation failed:\x1B[0m", true, true);
                            if (response.status == 429) {
                                pushMessage("\x1B[91mOperation too fast\x1B[0m", true, true);
                            } else pushMessage("\x1B[91mserver failed\x1B[0m", true, true);
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
                pushMessage("\x1B[91mUnknow path\x1B[0m", true, true);
                resolve();
            }
        })
    },
    help: 'Read/Edit note.ms page',
    moreHelp: 'Read/Edit note.ms page',
    usage: '[set/get] [path] <text(allow space)>'
}