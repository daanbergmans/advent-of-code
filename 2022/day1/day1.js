const fs = require("fs");

let text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const getCalSums = () => text
    .replaceAll('\r\n', '\n')
    .split('\n\n')
    .map(p => p.split('\n').map(c => parseInt(c, 10)))
    .map(p => p.reduce((a, b) => a + b))
    .sort((a, b) => b - a)

const part1 = () => [...getCalSums()][0];

const part2 = () => [...getCalSums()]
    .slice(0, 3)
    .reduce((a, b) => a + b);

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());