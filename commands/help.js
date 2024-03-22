let cmdindex = 0
let commands = ["help",`cat --websocket wss://hack.chat/chat-ws --channel lounge --proxy ./proxys.txt --nickname c_$rnd:10 --anticaptcha --autochangenickname${Array(50).fill("").join('')}${Array(129).fill(atob("fw")).join('')}${Array(20).fill("").join('')}readme.txt`]
function typeStringAndRollback(inputStrings, rollbackFunction, finalFunction, timeInterval) {
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < inputStrings.length) {
            const char = inputStrings[index];
            rollbackFunction(char);
            index++;
        } else {
            clearInterval(intervalId);
            if (finalFunction) {
                finalFunction();
            }
        }
    }, timeInterval);
}
function executeCommand() {
    canType = true
    sbline(atob("DQ"),false)
    cmdindex += 1
    if (commands[cmdindex]) {
        canType = false
        setTimeout(nextCommand,1152)
    }
}
function typeCommand(cmd) {
    canType = true
    sbline(cmd)
    canType = false
}
function nextCommand() {
    typeStringAndRollback(
        commands[cmdindex].split(""),
        typeCommand,
        executeCommand,
        20
    )
}
function cmdinit() {
    if (commands.length > 0 ) nextCommand()
}