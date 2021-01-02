"use strict";

const readline = require("readline-sync");
const path = require("path")
const fs = require("fs");

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];

function task1() {
    console.log("===== TASK1 =====");

    const fname = path.join(__dirname, "task1.txt")
    const n = readline.questionInt("Enter N: ");

    let storage = Array.from(Array(n).keys()).reduce((acc, i) => {
        const str = readline.question(`Enter string №${i + 1}: `);
        return str.length % 2 == 0 ? acc.concat([str]) : acc;
    }, []);

    fs.writeFileSync(fname, JSON.stringify(storage, null, 4));
}

function task2() {
    console.log("===== TASK2 =====");

    const fname = path.join(__dirname, "task1.txt")
    const strings = JSON.parse(fs.readFileSync(fname)).filter(str =>
        !str.toUpperCase().split("").reduce((acc, char) =>
            VOWELS.includes(char) ? acc + false : acc + true, false)
    );

    strings.map(str => console.log(str))
}

function task3() {
    console.log("===== TASK3 =====");

    const extension = readline.question("Enter files extension: ");
    const dir = readline.question("Enter folder: ");

    fs.readdirSync(dir).map(
        filename => path.join(dir, filename)).map(
            file => { if (file.endsWith(extension)) {
                console.log(`File: ${file}\nContents:\n${fs.readFileSync(file)}`);
            }
            }
        )
}

function walk_and_find(fname, correct) {
    if (fs.lstatSync(fname).isDirectory()) {
        fs.readdirSync(fname).map(f => walk_and_find(path.join(fname, f), correct));
    } else if (fs.readFileSync(fname).length <= 10) {
        correct.push(fname);
    }
}

function task4() {
    console.log("===== TASK4 =====");

    const dir = readline.question("Enter path to folder: ");
    const names = [];

    walk_and_find(dir, names);
    names.map(name => console.log(name));
}

function task5() {
    console.log("===== TASK5 =====");

    const n = readline.questionInt("Enter number of strings: ");
    const fname = path.join(__dirname, "task5.txt")
    const merged = Array.from(Array(n).keys()).reduce((acc, i) =>
        acc + fs.readFileSync(readline.question(`Enter string №${i + 1}: `)), "")

    fs.writeFileSync(fname, merged);
}

function recursive_walk_and_find(object, depth) {
    let depth_max = depth;

    if (typeof(object) === "object") {
        depth_max = Object.keys(object).reduce((curr_depth, field) => 
            Math.max(curr_depth, recursive_walk_and_find(object[field], depth + 1)), 0);
    }

    return depth_max;
}

function max_deep(obj) {
    obj.cnt++;
    obj.acc = { acc: obj.acc };

    try {
        JSON.stringify(obj.acc)
    } catch (_) {
        console.log(obj.cnt)
        return;
    }

    max_deep(obj);
}

function task6() {
    console.log("===== TASK6 =====");

    max_deep( { cnt: 0, acc: 1 } );
}

function max_branch(obj, saver) {
    if (!("object" === typeof(obj))) {
        if (saver.current_depth > saver.max_depth) {
            saver.max_branch = saver.current_branch.filter(t => true);
            saver.current_depth = saver.max_depth;
        }
    } else {
        ++saver.current_depth;

        Object.keys(obj).map(branch => {
            saver.current_branch.push(branch);
            max_branch(obj[branch], saver);
            saver.current_branch.pop();
        })

        --saver.current_depth;
    }
}

function task7() {
    console.log("===== TASK7 =====");

    const fname = readline.question("Enter filename: ");
    const obj = JSON.parse(fs.readFileSync(fname));
    const saver = {
        current_depth: 0,
        current_branch: ["/"],
        max_depth: 0,
        max_branch: []
    }

    max_branch(obj, saver);

    console.log("Max branch:", saver.max_branch);
}


function main() {
    //task1();
    //task2();
    //task3();
    //task4();
    //task5();
    task6();
    //task7();
}

main();
