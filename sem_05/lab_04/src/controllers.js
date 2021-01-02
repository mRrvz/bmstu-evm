const path = require("path");
const fs = require("fs");

module.exports.max3 = (req, res) => {
    let fst = parseInt(req.body.fst.toString());
    let snd = parseInt(req.body.snd.toString());
    let thd = parseInt(req.body.thd.toString());

    if (!fst || !snd || !thd) {
        res.status(400).send("Bad numbers, try again.");
    }

    res.status(200).send(`Result: ${Math.max(fst, snd, thd)}`);
}

module.exports.get_by_index = (req, res) => {
    let index = parseInt(req.body.index.toString());

    if (!index || index < 0 || index > array.length) {
        res.status(400).send("Invalid index.");
    }

    const array = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "array.json")));

    res.status(200).send(JSON.stringify(array[index]));
}

module.exports.find_mod = (req, res) => {
    let a = parseInt(req.body.a.toString()); 
    let b = parseInt(req.body.b.toString()); 
    let c = parseInt(req.body.c.toString()); 

    if (!a || !b || !c) {
        res.status(400).send("Invalid input.");
    }

    if (b <= a) {
        res.status(400).send("B must be greate than A.");
    }

    if (c <= 0) {
        res.status(400).send("C must be greater than 0.");
    }

    const numbers = Array.from(Array(b + 1).keys()).filter(x => x >= a && x % c === 0);
    
    res.status(200).send(JSON.stringify(numbers));
}

function gen_header(address) {
    return `<form method="POST" action="${address}">`;
}

function gen_form(fields) {
    let content = fields.reduce((acc, field) => acc + ` <label for="${field}">Enter ${field}:</label>
        <input type="text" name="${field}">
        <br>`, "")

    content += `<input type="submit"></form>`;

    return content;
}

function gen_page(fields, address) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NodeLab04</title>
    </head>
    <body>` + gen_header(address) + gen_form(fields) + `</body></html>`

    return content;
}

module.exports.generate = (req, res) => {
    let fields = req.body.fields;
    let address = req.body.address;

    if (!fields || !address) {
        res.status(400).send("Invalid input.");
    }

    if (address.charAt(0) !== '/') {
        address = '/' + address;
    }
    
    res.send(gen_page(fields.split(' '), address));
}

