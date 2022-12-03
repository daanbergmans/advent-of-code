const fs = require("fs");

let seatData = fs.readFileSync("./data/day5.txt", { encoding: "utf-8" })
    .split("\n");
const starterRowRanges = [[0, 63], [64, 127]];
const starterColumnRanges = [[0, 3], [4, 7]];

let seatIds = [];

for (let i = 0; i <= seatData.length - 1; i++) {
    let seatRow = calculate(i, ["F", "B"], [0, 6], "row");
    let seatColumn = calculate(i, ["L", "R"], [7, 9], "column");
    let seatId = seatRow * 8 + seatColumn;

    seatIds.push(seatId);
}

console.log("The maximum seat id is: " + Math.max(...seatIds));

function calculate(rowIndex, limitsChars, limitsLoops, type) {
    if (type == "row") {
        currentRanges = [...starterRowRanges];
    } else if (type == "column") {
        currentRanges = [...starterColumnRanges];
    }

    for (let j = limitsLoops[0]; j <= limitsLoops[1]; j++) {
        let currentChar = seatData[rowIndex].charAt(j);
        let positionValueToDivide;

        if (currentChar == limitsChars[0]) {
            positionValueToDivide = 0;
        } else if (currentChar == limitsChars[1]) {
            positionValueToDivide = 1;
        }

        let selectedRange = currentRanges[positionValueToDivide];
        let middleValue = selectedRange[0] + ((selectedRange[1] - selectedRange[0]) / 2);
        let firstRange = [selectedRange[0], Math.floor(middleValue)];
        let secondRange = [Math.ceil(middleValue), selectedRange[1]]
        
        currentRanges = [firstRange, secondRange];
    }

    return currentRanges[0][0];
}