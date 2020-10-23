"use strict";

const PATH_TO_MAIN_PAGE = "index.ejs";
const GAMES_FILE = "games.ejs";
const PERSONAL_FILE = "personal.ejs";

const path = require("path");
const db_obj = require("./db_obj");

module.exports.default_controller = (_, res) => res.render(PATH_TO_MAIN_PAGE);

module.exports.set_headers = (_, res, next) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

module.exports.render_games = (req, res) => {
    let age, games = [], error = null;

    try {
        age = parseInt(req.query.age);
        games = db_obj.games.filter(game => game.age <= age);
    } catch(_) {
        console.log(err);
    }

    if (games.length) {
        error = "По вашему запросу нет игр";
    }

    res.render(GAMES_FILE, { games, error });
}

module.exports.logger = (req, _, next) => {
    if (req.method === "POST")
        console.log(`body:\n${JSON.stringify(req.body, null, 4)}`);
    else if (req.method === "GET")
        console.log(`query params:\n${JSON.stringify(req.query, null, 4)}`);

    next();
}

const render_personal = (req, res) => {
    let metainfo = { isAuth: false };

    const login = req.session.login;
    const password = req.session.password;

    if (login && password) {
        metainfo.isAuth = true;
        metainfo.user = db_obj.users.find(elem => elem.login === login && elem.password === password);
    }

    if (req.error)
        metainfo.error = req.error;

    if (!metainfo.error)
        metainfo.error = false;

    res.render(PERSONAL_FILE, metainfo);
}

module.exports.login = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (!login && !password)
        req.error = "Не введен логин или пароль";
    else {
        if (db_obj.users.find(user => user.login === login && user.password === password)) {
            req.session.login = req.body.login;
            req.session.password = req.body.password;
        } else {
            req.error = "Такого пользователя нет в базе данных";
        }
    }

    render_personal(req, res);
}

module.exports.exit = (req, res) => {
    req.session = null;
    res.redirect("/personal");
}

module.exports.render_personal = render_personal;
