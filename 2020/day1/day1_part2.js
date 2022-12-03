const fs = require("fs");

let text = fs.readFileSync("./data/day1.txt", { encoding: "utf-8" });

let textArray = text.split(/\r?\n/);

for (let i = 0; i <= textArray.length; i++) {
    for (let j = i + 1; j <= textArray.length; j++) {
        for (let k = j + 1; k <= textArray.length; k++) {
            let number1 = parseInt(textArray[i]);
            let number2 = parseInt(textArray[j]);
            let number3 = parseInt(textArray[k]);
            let sum = number1 + number2 + number3;

            if (sum === 2020) {
                console.log("Solution is: " + (number1 * number2 * number3));
            }
        }
    }
}
