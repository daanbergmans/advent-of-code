const fs = require("fs");

const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const monkeyObjLength = 6;

const lines = text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .filter((l) => l)
    .map((l) => l.trim());

let monkeys = lines
    .map((line, index) => index % monkeyObjLength === 0 ? lines.slice(index, index + monkeyObjLength) : null)
    .filter((monkey) => monkey)
    .map(([id, items, op, test, caseTrue, caseFalse]) => ({
            id: parseInt(id.slice(7, 8), 10),
            items: items.slice(16).split(', ').map((i) => parseInt(i, 10)),
            op: op.slice(21).split(' '),
            test: parseInt(test.slice(19), 10),
            caseTrue: parseInt(caseTrue.slice(caseTrue.length - 1, caseTrue.length), 10),
            caseFalse: parseInt(caseFalse.slice(caseFalse.length - 1, caseFalse.length), 10),
            itemsThrown: 0
        })
    );

const handleRound = () => {
    monkeys.forEach((monkey, monkeyIndex) => {
        const { op, test, caseTrue, caseFalse } = monkey;
        const [method, amount] = op;
        monkey.items.forEach((item) => {
            const itemCalculation = Math.floor(calcs[method](item, amount === 'old' ? item : amount) / 3);
            monkeys[itemCalculation % test === 0 ? caseTrue : caseFalse].items.push(monkeys[monkeyIndex].items.shift());
            monkeys[monkeyIndex].itemsThrown += 1;
        })
    })
}

const calcs = {
    '+' : (a, b) => a + b,
    '-' : (a, b) => a - b,
    '*' : (a, b) => a * b,
    '/' : (a, b) => a / b
}

const handleRounds = () => {
    for (let i = 1; i <= 20; i++) {
        handleRound();
    }

    return monkeys.map((m) => m.itemsThrown).sort((a, b) => a - b).slice(-2).reduce((a, b) => a * b);
}

const part1 = () => handleRounds();

const part2 = () => {}

// Part 1
console.log('Part 1: ', part1());

// Part 2
// console.log('Part 2: ', part2());