"use strict";

const utils = require("./utils");

module.exports.insert_record = (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price)
            throw Error("");

        utils.put({ name, price });
        res.status(200).send(JSON.stringify({ result: "Ok" }));
    } catch(_) {
        res.status(400).send(JSON.stringify({ result: "No object in body" }));
    }
}

module.exports.select_record = (req, res) => {
    const car = utils.get(req.query.name);
    if (car)
        res.status(200).send(JSON.stringify({ result: "Ok", car }))
    else
        res.status(400).send(JSON.stringify({ result: `No car with name ${req.query.name}` }));
}


module.exports.bad_request_controller = (req, res) => {
    res.status(400).send(JSON.stringify({ result: `Unknown request: ${req.method} ${req.url}` }));
}

module.exports.logger = (req, _, next) => {
    console.log(`${req.url} ${req.method}`);

    if (req.method === "GET") {
        console.log(req.query);
    } else if (req.method === "POST") {
        console.log(req.body);
    }

    next();
}
