"use strict";

const exec = require("child_process").execSync;

const fact = (num) => {
    const value = exec(`node fact.js ${num}`);
    return parseInt(value);
}

const result = process.argv.slice(2, process.argc).map(num => parseInt(num));
result.map(num => console.log(`${num}! = ${fact(num)}`))
