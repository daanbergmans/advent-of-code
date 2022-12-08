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

const checkBothSides = (row, treeRowIndex, treeColIndex, treeHeight) => checkSideOfTree(row, treeRowIndex, treeColIndex, treeHeight, true) || checkSideOfTree(row, treeRowIndex, treeColIndex, treeHeight, false)

const checkBothEnds = (col, treeRowIndex, treeColIndex, treeHeight) => checkEndOfTree(col, treeRowIndex, treeColIndex, treeHeight, true) || checkEndOfTree(col, treeRowIndex, treeColIndex, treeHeight, false)

const checkSideOfTree = (row, treeRowIndex, treeColIndex, treeHeight, left) => 
    isBorder(treeRowIndex, treeColIndex) ||
    Math.max(
        ...(left 
            ? (treeColIndex === 0 
                ? [0] 
                : row.slice(0, treeColIndex)) 
            : (treeColIndex === row.size - 1 
                ? [0] 
                : row.slice(treeColIndex + 1, row.length)))
    ) < treeHeight;

const checkEndOfTree = (col, treeRowIndex, treeColIndex, treeHeight, top) =>
    isBorder(treeRowIndex, treeColIndex) ||
    Math.max(
        ...(top 
            ? (treeRowIndex === 0 
                ? [0] 
                : col.slice(0, treeRowIndex)) 
            : (treeRowIndex === col.length - 1 
                ? [0] 
                : col.slice(treeRowIndex + 1, col.length)))
    ) < treeHeight;

const isBorder = (treeRowIndex, treeColIndex) => treeColIndex === 0 || treeColIndex === FOREST_WIDTH - 1 || treeRowIndex === 0 || treeRowIndex === FOREST_LENGTH - 1;

const part1 = () => checkForest();

const part2 = () => {
};

// Part 1
console.log('Part 1: ', part1());

// Part 2
// console.log('Part 2: ', part2());