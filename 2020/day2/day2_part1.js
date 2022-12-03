const fs = require("fs");

let passwords = fs.readFileSync("./data/day2.txt", { encoding: "utf-8" });
let passwordTextArray = passwords.split(/\r?\n/);
let validCounter = 0;

for (let i = 0; i < passwordTextArray.length; i++) {
    let currentPasswordLine = passwordTextArray[i].split(" ");

    let lowerLimit = currentPasswordLine[0].split("-")[0];
    let upperLimit = currentPasswordLine[0].split("-")[1];
    let requiredCharacter = currentPasswordLine[1].replace(":", "");
    let password = currentPasswordLine[2];

    let amountOfCharOccurrences = password.split(requiredCharacter).length - 1;

    if (amountOfCharOccurrences >= lowerLimit && amountOfCharOccurrences <= upperLimit) {
        validCounter++;
    }
}

console.log(validCounter);