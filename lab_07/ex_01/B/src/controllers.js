"use strict";

const utils = require("./utils");

module.exports.insert_record = (req, res) => {
    try {
        const { name, cars } = req.body;
        if (!name || !cars)
            throw Error("");
        utils.put({ name, cars });

        res.status(200).send(JSON.stringify({ result: "Ok" }));
    } catch(_) {
        res.status(400).send(JSON.stringify({ result: "No object in body" }));
    }
}

module.exports.select_record = (req, res) => {
    const stock = utils.get(req.query.name);
    if (stock)
        res.status(200).send(JSON.stringify({ result: "Ok", stock }))
    else
        res.status(400).send(JSON.stringify({ result: `No stock with name ${req.query.name}` }));
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
