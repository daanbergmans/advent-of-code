const fs = require("fs");

let passports = fs.readFileSync("./data/day4.txt", { encoding: "utf-8" });

let passportsList = passports.toString()
.split(/(\r\n){2}/g)
.filter(v => v != "\r\n")
.map(v => v.replace(/\r\n/g, " "))
.filter(p => passportHasAllMandatoryFields(p));

function passportHasAllMandatoryFields(passport) {
    const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    for (let i = 0; i <= mandatoryFields.length - 1; i++) {
        if (!passport.includes(mandatoryFields[i])) {
            return false;
        }
    }
    return true;
}

console.log("Amount of valid passports: " + passportsList.length);
