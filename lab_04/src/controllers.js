module.exports.max3 = (req, res) => {
    let fst = req.body.fst;
    let snd = req.body.snd;
    let thd = req.body.thd;

    if (isNaN(fst) || isNaN(snd) || isNaN(thd)) {
        res.status(400).send("Bad numbers, try again.");
    }

    res.status(200).send(`Result: ${Math.max(fst, snd, thd)}`);
}

module.exports.post = (req, res) => {
    res.status(200).send(`Address: ${req.url};\nBody: ${JSON.stringify(req.body)}`);
}
