const fs = require("fs");

let amountOfCommonsAnswersPerGroup = fs.readFileSync("./data/day6.txt", { encoding: "utf-8" })
    .split(/(\r\n){2}/g)
    .filter(v => v != "\r\n")
    .map(v => v.replace(/\r\n/g, " "))
    .map(v => {
        let amountCommonAnswers = 0;
        // Create an array of the answers in the group with split
        // Destructure them into a set so only unique values are present
        let answerList = v.split(" ");
        let filteredList = v.split("").filter(x => x !== " ");
        let distinctAnswers = [...new Set(filteredList)];

        // For every unique answer in the group
        for (let i = 0; i <= distinctAnswers.length - 1; i++) {
            // Get a single answer
            let answer = distinctAnswers[i];

            // Check if every answerlist of the people in the group include the current answer
            if (answerList.every(currentAnswers => currentAnswers.includes(answer))) {
                amountCommonAnswers++;
            }
        }

        return amountCommonAnswers;
    }).reduce((a, b) => a + b, 0);

    console.log("The result is: " + amountOfCommonsAnswersPerGroup);