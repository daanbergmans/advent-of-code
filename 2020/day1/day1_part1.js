const fs = require("fs");

let text = fs.readFileSync("./data/day1.txt", { encoding: "utf-8" });

let textArray = text.split(/\r?\n/);

for (let i = 0; i <= textArray.length; i++) {
    for (let j = i + 1; j <= textArray.length; j++) {
        let number1 = parseInt(textArray[i]);
        let number2 = parseInt(textArray[j]);
        let sum = number1 + number2;

        if (sum === 2020) {
            console.log("Solution is: " + (number1 * number2));
        }
    }
}
