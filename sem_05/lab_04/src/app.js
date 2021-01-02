"use strict";

const express = require("express");
const path = require("path");
const body_parser = require("body-parser");

const post = require("./controllers").post;
const router = require("./router");

const port = 5015;
const index_page = path.join(__dirname, "..", "public", "index.html")

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use((req, _, next) => {
    console.log(req.url);

    if (req.method === "POST") {
        console.log(req.body);
    }
    else if (req.method === "GET") {
        console.log(req.query);
    }

    next();
})

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/tasks", router);

app.use((req, res, next) => {
    if (req.method === "POST") {
        // обработка всех подряд POST-запросов
        res.send(`Address: ${req.url}, \nBody of POST: ${JSON.stringify(req.body)}`);
    } else {
        next();
    }
});

app.use((req, res) => {
    res.sendFile(index_page);
});

app.listen(port);

console.log(`Server running. Port: ${port}`);
