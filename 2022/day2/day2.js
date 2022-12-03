const fs = require("fs");

let text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const elfMap = { 'A' : 1, 'B' : 2, 'C' : 3 };

const playerMap = { 'X' : 1, 'Y' : 2, 'Z' : 3 };

const getArray = () => text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map(r => r.split(' '));

const getMappedArray = () => getArray()
    .map(([elf, player]) => [elfMap[elf], playerMap[player]]);

const part1 = () => getMappedArray()
    .reduce((sum, game) => 
        game[0] === game[1] 
            ? sum + game[1] + 3
            : rotate(game[0], 1) === game[1]
                ? sum + game[1] + 6
                : sum + game[1]
    , 0);

const part2 = () => getMappedArray()
    .map(([elf, result]) =>
        result === 2
            ? elf + 3
            : result === 3
                ? rotate(elf, 1) + 6
                : rotate(elf, 2)
    ).reduce((sum, val) => sum + val);

const rotate = (elf, amount) => {
    const hand = elf + amount

    if (hand <= 3) return hand;

    return hand == 4 ? 1 : 2;
}

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());