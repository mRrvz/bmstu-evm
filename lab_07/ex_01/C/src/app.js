const express = require("express");
const body_parser = require("body-parser");
const path = require("path");

const router = require("./router");
const logger = require("./controllers").logger;

const port = process.env.PORT | 3000;
const VIEWS_FOLDER = path.join(__dirname, "..", "views");
const PUBLIC_FOLDER = path.join(__dirname, "..", "public");

const app = express();

app.set("view engine", "ejs");
app.set("views", VIEWS_FOLDER)

app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(PUBLIC_FOLDER))
app.use(logger);

app.use(router);

app.listen(port);
console.log(`Сервер запущен. Порт: ${port}`);
