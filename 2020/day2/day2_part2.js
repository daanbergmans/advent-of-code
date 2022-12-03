const fs = require("fs");

let passwords = fs.readFileSync("./data/day2.txt", { encoding: "utf-8" });
let passwordTextArray = passwords.split(/\r?\n/);
let validCounter = 0;

for (let i = 0; i < passwordTextArray.length; i++) {
    let currentPasswordLine = passwordTextArray[i].split(" ");

    let firstPosition = currentPasswordLine[0].split("-")[0];
    let secondPosition = currentPasswordLine[0].split("-")[1];
    let requiredCharacter = currentPasswordLine[1].replace(":", "");
    let password = currentPasswordLine[2];

    let chars = password.charAt(firstPosition - 1) + password.charAt(secondPosition - 1);

    if ((chars.match(new RegExp(requiredCharacter, "g")) || []).length == 1) {
        validCounter++;
    }
}

console.log(validCounter);