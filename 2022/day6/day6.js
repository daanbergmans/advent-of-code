const fs = require("fs");

const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const getResult_v1 = (amount) => {
    for (let i = amount - 1; i < text.length; i++) {
        const marker = text.substring(i - amount + 1, i + 1);

        if (new Set(marker).size === amount) return i + 1;
    }
}

const getResult = (string, index, amount) => string.substring(0, amount).length === (new Set(string.substring(0, amount))).size ? index : getResult(string.slice(1), index + 1, amount);

const part1 = () => getResult(text, 4, 4);

const part2 = () => getResult(text, 14, 14);

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());