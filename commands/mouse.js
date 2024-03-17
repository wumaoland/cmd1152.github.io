COMMANDS.mouse = {
    run: () => {
        var amouse = ["这只老鼠还活着", "这只老鼠正在咬国防光缆", "这只老鼠很孤独", "这只老鼠在游荡", "我们给这只老鼠起了个外号——冒险家", "这只老鼠可以替代鼠标", "没有人知道明天和事故谁先来", "这只老鼠在地球上摔死了", "他还记得fish吗？", "他还记得他的初心吗？", "他的决心碎了一地", "123456从来都不是个好的密码", "他和人一样，会犯错", "神不会流血", "有趣", "他仍然需要面对现实", "<MrZhang365> go die", "活着的意义是什么", "他自杀了"]
        pushMessage("     _   _");
        pushMessage("    (q\\_/p)");
        pushMessage(".-.  |. .|");
        pushMessage("   \\ =\\,/=");
        pushMessage("    )/ _ \\  |\\");
        pushMessage("   (/\\):(/\\  )\\");
        pushMessage("    \\_   _/ |Oo\\");
        pushMessage("    `\"\"^\"\"` `\"\"\"`");
        pushMessage("");
        pushMessage(`\x1B[3m${getRandomItemFromArray(amouse)}\x1B[0m`, true, true)
    },
    help: '一直孤独的老鼠',
    moreHelp: '执行这个命令，你看见看见一只一直孤独的老师，mouse@XChat',
    usage: ''
}