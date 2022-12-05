const fs = require("fs");

let text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const array = text
    .replaceAll('\r\n', '\n')
    .split('\n');

const stacksText = array.slice(0, 8).map(l => 
    (' ' + l).match(/.{1,4}/g).map((c) => 
        c.trim().replace(/\[|\]/g, '')));

const instructions = array.slice(10, array.length).map((i) => 
    i.split(' ').filter((v) => 
        !isNaN(v)).map((i) =>
            parseInt(i, 10)));

const getStacks = (stacksText) => {
    const stacks = Array.from({ length: 9 }, () => []);

    stacksText.forEach((stackRow) => {
        stackRow.forEach((container, stackIndex) => {
            if (container !== '') {
                stacks[stackIndex].unshift(container)
            }
        });
    });

    return stacks;
}

const followInstructions = (stacks, instructions, reverse) => {
    instructions.forEach(([amount, from, to]) => {
        const containers = stacks[from - 1].splice(stacks[from - 1].length - amount, amount);
        stacks[to - 1].push(...(reverse ? containers.reverse() : containers));
    });

    return stacks;
}

const part1 = () => followInstructions(getStacks(stacksText), instructions, true).reduce((stacks, stack) => stacks + stack[stack.length - 1], '');

const part2 = () => followInstructions(getStacks(stacksText), instructions, false).reduce((stacks, stack) => stacks + stack[stack.length - 1], '');

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());