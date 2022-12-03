const fs = require("fs");

let sumOfUniqueQuestionsAllGroups = fs.readFileSync("./data/day6.txt", { encoding: "utf-8" })
    .split(/(\r\n){2}/g)
    .filter(a => a != "\r\n")
    .map(v => v.replace(/\r\n/g, " "))
    .map(v => v.replace(/ /g, ""))
    .map(v => v.split("")
        .filter((v, index, self) => {
            return self.indexOf(v) == index
        })
        .join("")
    ).map(v => parseInt(v.length))
    .reduce((a, b) => a + b, 0)

console.log(sumOfUniqueQuestionsAllGroups);