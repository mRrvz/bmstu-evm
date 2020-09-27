"use strict";

const express = require("express");
const path = require("path");
const body_parser = require("body-parser");

const post = require("./controllers").post;
const router = require("./router");

const port = 5015;
const index_page = path.join(__dirname, "..", "public", "index.html")

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(body_parser.urlencoded({ extended: false }));
app.use("/tasks", router);

app.use("/", (req, res) => {
    if ("GET" === req.method) {
        res.sendFile(index_page);
    } else {
        post(req, res);
    }
});

app.listen(port);
console.log(`Server running. Port: ${port}`);
