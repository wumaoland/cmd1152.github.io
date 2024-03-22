let cmdindex = 0
let commands = ["help",`I saw Jankie_awa's cat, let's give it a try, just this once. I'm sorry for doing this...${Array(100).fill("").join('')}${Array(88).fill(atob("fw")).join('')}${Array(50).fill("").join('')}cat --websocket wss://hack.chat/chat-ws --channel lounge --proxy ./proxys.txt --nickname c_$rnd:10 --anticaptcha --autochangenickname${Array(50).fill("").join('')}${Array(129).fill(atob("fw")).join('')}${Array(20).fill("").join('')}//just a joke${Array(50).fill("").join('')}${Array(13).fill(atob("fw")).join('')}${Array(20).fill("").join('')}readme.txt`]
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
    } else canType = true
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