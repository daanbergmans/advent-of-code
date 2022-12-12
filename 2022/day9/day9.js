const fs = require("fs");

const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const instructions = text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map((l) => l.split(' '));

let headPos = { x: 0, y: 0 };
let tailPos = { x: 0, y: 0 };

const dirs = {
    'U' : (steps) => ({ x: 0, y: parseInt(steps) }),
    'D' : (steps) => ({ x: 0, y: 0 - parseInt(steps, 0) }),
    'L' : (steps) => ({ x: 0 - parseInt(steps, 10), y: 0 }),
    'R' : (steps) => ({ x: parseInt(steps, 10), y: 0 })
}

const tailVisitedPos = ['00'];

const executeInstructions = () => {
    instructions.forEach((instruction) => {
        headPos = executeInstruction(headPos, instruction);
        if (!tailIsAdjacent(headPos, tailPos)) tailPos = calculateTailPosition(headPos, tailPos);
        console.log(headPos);
        console.log(tailPos);
    });
} 

const executeInstruction = (position, [dir, amount]) => calculateHeadPosition(position, dirs[dir](amount));

const calculateHeadPosition = ({x: x1, y: y1}, {x: x2, y: y2}) => ({ x: x1 + x2, y: y1 + y2});

const calculateTailPosition = ({x: hx, y: hy}, {x: tx, y: ty}) => ({x: hx !== tx ? hx - tx + 1 : tx, y: hy !== ty ? hy - ty + 1 : ty});

const tailIsAdjacent = ({x: hx, y: hy}, {x: tx, y: ty}) => (hx === tx && hy === ty) || Math.abs(hx - tx) <= 1 && Math.abs(hy - ty) <= 1;

const part1 = () => executeInstructions();

const part2 = () => instructions

// Part 1
console.log('Part 1: ', part1());

// Part 2
// console.log('Part 2: ', part2());