const fs = require("fs");

let text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const getArray = () => text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map((line) => line
        .split(',')
        .map((elf) => elf
            .split('-')
            .map((section) => parseInt(section, 10))));

const orCheckLogic = (a, b) => a || b;
const andCheckLogic = (a, b) => a && b;

const checkBothPairs = (pair1, pair2, checkLogic) => checkPair(pair1, pair2, checkLogic) || checkPair(pair2, pair1, checkLogic);

const checkPair = (pair1, pair2, checkLogic) => checkLogic(checkBetween(pair1, pair2[0]), checkBetween(pair1, pair2[1]));

const checkBetween = ([start, end], number) => number >= start && number <= end;

const part1 = () => getArray()
    .filter(([pair1, pair2]) => checkBothPairs(pair1, pair2, andCheckLogic))
    .length;

const part2 = () => getArray()
    .filter(([pair1, pair2]) => checkBothPairs(pair1, pair2, orCheckLogic))
    .length;

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());