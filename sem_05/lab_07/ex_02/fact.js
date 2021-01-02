"use strict";

const fact = (num) => {
    return Array.from(Array(parseInt(num)).keys()).reduce((acc, i) => acc * (i + 1), 1)
}

console.log(fact(process.argv[2]));
