const path = require("path");
const fs = require("fs");

module.exports.max3 = (req, res) => {
    let fst = req.body.fst;
    let snd = req.body.snd;
    let thd = req.body.thd;

    if (isNaN(fst) || isNaN(snd) || isNaN(thd)) {
        res.status(400).send("Bad numbers, try again.");
    }

    res.status(200).send(`Result: ${Math.max(fst, snd, thd)}`);
}

module.exports.get_by_index = (req, res) => {
    let index;

    try {
        index = parseInt(req.body.index.toString());
    } catch {
        res.status(400).send("Invalid index.");
    }

    const array = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "array.json")));

    if (index < 0 && index > array.length) {
        res.status(400).send("Invalid index.");
    }

    res.status(200).send(JSON.stringify(array[index]));
}
