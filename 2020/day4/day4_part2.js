const fs = require("fs");

let passports = fs.readFileSync("./data/day4.txt", { encoding: "utf-8" });

let passportsList = passports.toString()
.split(/(\r\n){2}/g)
.filter(v => v != "\r\n")
.map(v => v.replace(/\r\n/g, " "))
.filter(p => passportHasAllMandatoryFields(p))
.map(v => Object.fromEntries(
        v.split(" ")
        .map(w => w.split(":"))
    ))
.filter(p => passportHasValidFields(p));
    
function passportHasAllMandatoryFields(passport) {
    const mandatoryFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    for (let i = 0; i <= mandatoryFields.length - 1; i++) {
        if (!passport.includes(mandatoryFields[i])) {
            return false;
        }
    }
    return true;
}

function passportHasValidFields(passport) {
    let byrIsValid = isValidYear(passport.byr, 4, 1920, 2002);
    let iyrIsValid = isValidYear(passport.iyr, 4, 2010, 2020);
    let eyrIsValid = isValidYear(passport.eyr, 4, 2020, 2030);
    let hgtIsValid = isValidHeight(passport.hgt);
    let hclIsValid = isValidHairColor(passport.hcl);
    let eclIsValid = isValidEyeColor(passport.ecl);
    let pidIsValid = isValidPassportId(passport.pid);

    return byrIsValid && iyrIsValid && eyrIsValid && hgtIsValid && hclIsValid && eclIsValid && pidIsValid;
}

function isValidYear(year, length, lowerLimit, upperLimit) {
    return year.length === length && numberIsBetween(year, lowerLimit, upperLimit);
}

function isValidHeight(height) {
    let unit = height.slice(-2);
    let value = parseInt(height.substring(height.length -2, 0));

    return unit === "cm" && numberIsBetween(value, 150, 193) || unit === "in" && numberIsBetween(value, 59, 76)
}

function isValidHairColor(hairColor) {
    return /^#([a-f0-9]){6}$/.test(hairColor);
}

function isValidEyeColor(eyeColor) {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(eyeColor);
}

function isValidPassportId(passportId) {
    return /^[0-9]{9}$/.test(passportId);
}

function numberIsBetween(number, lowerLimit, upperLimit) {
    let value = parseInt(number, 10);
    return value >= lowerLimit && value <= upperLimit;
}

for (let i = 0; i <= 20; i++) {
    let test = passportHasValidFields(passportsList[i]);
}

console.log("The amount of valid passports is: " + passportsList.length);