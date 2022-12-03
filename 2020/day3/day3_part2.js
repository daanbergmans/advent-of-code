const fs = require("fs");

let terrain = fs.readFileSync("./data/day3.txt", { encoding: "utf-8" });
let terrainArray = terrain.split(/\r?\n/);

function getAmountOfTrees(xIncrease, yIncrease) {
    const maxTerrainLength = terrainArray[0].length;
    let xPosition = 0;
    let amountOfTrees = 0;

    for (let yPosition = 0; yPosition <= terrainArray.length - 1; yPosition += yIncrease ) {
        let charOnPosition = terrainArray[yPosition].charAt(xPosition % maxTerrainLength);
        
        if (charOnPosition === "#") {
            amountOfTrees++;
        }
    
        xPosition += xIncrease;
    }

    return amountOfTrees;
}

let slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
]

let result = 1;

slopes.forEach(slope => {
    result *= getAmountOfTrees(slope.x, slope.y);
})

console.log("Result: ", result);