const fs = require("fs");

const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });

const lines = text
    .replaceAll('\r\n', '\n')
    .split('\n');

const forest = lines.map((l) => 
    l.split('')
    .map((t) => parseInt(t)));

const FOREST_LENGTH = forest.length;
const FOREST_WIDTH = forest[0].length;

const checkForest = () => forest.reduce((amountVisible, forestRow, treeRowIndex) => amountVisible + checkTreeRow(treeRowIndex, forest), 0);

const checkTreeRow = (treeRowIndex, forest) => 
    forest[treeRowIndex].reduce((amountVisible, treeHeight, treeColIndex) => 
        amountVisible + checkTree(
            treeRowIndex, 
            treeColIndex, 
            treeHeight, 
            forest[treeRowIndex], 
            forest.map((nTreeRow) => 
                nTreeRow[treeColIndex]))
    , 0);

const checkTree = (treeRowIndex, treeColIndex, treeHeight, treeRow, treeCol) => checkBothSides(treeRow, treeRowIndex, treeColIndex, treeHeight) || checkBothEnds(treeCol, treeRowIndex, treeColIndex, treeHeight);

const checkBothSides = (row, treeColIndex, treeHeight) => checkSideOfTree(row, treeColIndex, treeHeight, true) || checkSideOfTree(row, treeColIndex, treeHeight, false)

const checkBothEnds = (col, treeRowIndex, treeHeight) => checkEndOfTree(col, treeRowIndex, treeHeight, true) || checkEndOfTree(col, treeRowIndex, treeHeight, false)

const checkSideOfTree = (row, treeRowIndex, treeColIndex, treeHeight, left) => {
    if (isBorder(treeRowIndex, treeColIndex)) return true;

    const test = left 
    ? (treeColIndex === 0 
        ? [0] 
        : row.slice(0, treeColIndex)) 
    : (treeColIndex === row.size - 1 
        ? [0] 
        : row.slice(treeColIndex + 1, row.length))
    
    const test2 = Math.max(...test);
    
    const test3 = test2 < treeHeight;

    return test3;
}
    // Math.max(...(left 
    //     ? (treeColIndex === 0 
    //         ? [0] 
    //         : row.slice(0, treeColIndex)) 
    //     : (treeColIndex === row.size - 1 
    //         ? [0] 
    //         : row.slice(treeColIndex + 1, row.length))
    //     )) < treeHeight

const checkEndOfTree = (col, treeRowIndex, treeColIndex, treeHeight, top) =>  {
    if (isBorder(treeRowIndex, treeColIndex)) return true;

    const test = top 
    ? (treeRowIndex === 0 
        ? [0] 
        : col.slice(0, treeRowIndex)) 
    : (treeRowIndex === col.length - 1 
        ? [0] 
        : col.slice(treeRowIndex + 1, col.length))

    const test2 = Math.max(...test);

    const test3 = test2 < treeHeight;

    return test3;
}
    // Math.max(...(top 
    //     ? (treeRowIndex === 0 
    //         ? [0] 
    //         : col.slice(0, treeRowIndex)) 
    //     : (treeRowIndex === col.length - 1 
    //         ? [0] 
    //         : col.slice(treeRowIndex + 1, col.length))
    //     )) < treeHeight

const isBorder = (treeRowIndex, treeColIndex) => treeColIndex === 0 || treeColIndex === FOREST_WIDTH - 1 || treeRowIndex === 0 || treeRowIndex === FOREST_LENGTH - 1;

const part1 = () => checkForest();

const part2 = () => {
};

// Part 1
console.log('Part 1: ', part1());

// Part 2
// console.log('Part 2: ', part2());