const express = require("express");
const body_parser = require("body-parser");

const router = require("./router");
const logger = require("./controllers").logger;

const port = process.env.PORT | 4001;

const app = express();

app.use(body_parser.json());
app.use(logger);

app.use(router);

app.listen(port);
console.log(`Сервер запущен. Порт: ${port}`);
