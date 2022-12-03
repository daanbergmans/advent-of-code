const fs = require("fs");

let terrain = fs.readFileSync("./data/day3.txt", { encoding: "utf-8" });
let terrainArray = terrain.split(/\r?\n/);

const maxTerrainLength = terrainArray[0].length;
let xPosition = 0;
let amountOfTrees = 0;

for (let yPosition = 0; yPosition <= terrainArray.length - 1; yPosition++ ) {
    let charOnPosition = terrainArray[yPosition].charAt(xPosition % terrainArray[0].length);

    // let charOnPosition = terrainArray[yPosition].charAt(xPosition);
    
    if (charOnPosition === "#") {
        amountOfTrees++;
    }

    xPosition += 3;

    // if (xPosition > maxTerrainLength - 1) {
    //     xPosition = xPosition - maxTerrainLength;
    // }
}

console.log("Amount of trees on route: " + amountOfTrees);