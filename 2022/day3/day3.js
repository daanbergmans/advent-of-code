const fs = require("fs");

let text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const letters = 'abcdefghijklmnopqrstuvwxyz';

const getRucksacks = () => text
    .replaceAll('\r\n', '\n')
    .split('\n');

const getCompartments = () => getRucksacks()
    .map(r => ({ compartment1: r.substring(0, r.length / 2) , compartment2: r.substring(r.length / 2, r.length)}));

const getGroups = () => getRucksacks()
    .reduce(({ currentGroup, groups }, rucksack, currentIndex) => {
        if ((currentIndex + 1) % 3 === 0) return { currentGroup: [], groups: [...groups, [...currentGroup, rucksack]] };

        return { currentGroup: [...currentGroup, rucksack], groups};
    }, { currentGroup: [], groups: [] }).groups;

const getValueOfCommon = ({ compartment1, compartment2 }) => {
    for (let item of compartment1.split('')) {
        const index = compartment2.indexOf(item);
        
        if (index === -1) continue;

        const letter = compartment2.charAt(index);

        return letter === letter.toUpperCase()
            ? (letters.indexOf(letter.toLowerCase()) + 1) + 26
            : letters.indexOf(letter.toLowerCase()) + 1;
    }

    return 0;
}

const getGroupValueOfCommon = ([r1, r2, r3]) => {
    for (let item of r1.split('')) {
        const indexR2 = r2.indexOf(item)
        const indexR3 = r3.indexOf(item);

        if (indexR2 === -1 || indexR3 === -1) continue;

        const letter = r2.charAt(indexR2);

        return letter === letter.toUpperCase()
            ? (letters.indexOf(letter.toLowerCase()) + 1) + 26
            : letters.indexOf(letter.toLowerCase()) + 1;
    }
}

const part1 = () => getCompartments().reduce((sum, rucksack) => sum + getValueOfCommon(rucksack), 0);

const part2 = () => getGroups().reduce((sum, group) => sum + getGroupValueOfCommon(group), 0);

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());