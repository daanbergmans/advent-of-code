const fs = require("fs");

const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const commands = text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map((l) => l.split(' '));

const executeProgram = () => {
    let x = 1;
    let cmdPrevCycle = {};

    commands.forEach(([cmd, amount], index) => {
        console.log('Cycle:', index, 'Command:', cmd, amount)

        if (index + 1 === 20 || (index + 1) % 40 === 0) {
            console.log('Strength:', (index + 1) * x);
        }

        if (cmdPrevCycle.cmd === 'addx') {
            x += parseInt(cmdPrevCycle.amount)
            console.log('Executing', cmdPrevCycle.cmd, cmdPrevCycle.amount)
            console.log('Result:', x);
        } else {
            console.log('Executing nothing')
        }

        console.log('---------------------------')

        cmdPrevCycle = {cmd, amount};
    })
};

const executeAddX = (amount, x) => amount + x;

const part1 = () => executeProgram();

const part2 = () => {}

// Part 1
console.log('Part 1: ', part1());

// Part 2
// console.log('Part 2: ', part2());