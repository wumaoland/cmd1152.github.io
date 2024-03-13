COMMANDS.mouse = {
    run: () => {
        var amouse = ["This mouse is still alive", "This mouse is biting the national defense optical cable", "This mouse is very lonely", "This mouse is wandering", "We gave this mouse a nickname - Adventurer", "This mouse may be able to replace a mouse", "No one knows which one will come first, tomorrow or the accident", "This mouse crashed to death on Earth", "Does he still remember fish", "Does he still stick to his original dream?", "His determination shattered to the ground", "123456 is a bad password", "He can make mistakes", "God won't bleed", "too funny", "He still needs to face reality", "<MrZhang365> go die", "What is the meaning of living", "He committed suicide"]
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
    help: 'a onely mouse',
    moreHelp: 'run this command ,u can see a onely mouse. mouse@XChat',
    usage: ''
}