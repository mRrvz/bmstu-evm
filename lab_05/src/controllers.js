"use strict";

const path = require("path");
const fs = require("fs");

const DATABASE = path.join(__dirname, "..", "data", "database.txt");
const SECOND = "index_second.html"
const FOLDER = "public"

function get_all_users() {
    return JSON.parse(fs.readFileSync(DATABASE));
}

function update_database(database, user) {
    database.push(user);
    fs.writeFileSync(DATABASE, JSON.stringify(database));
}

module.exports.add_user = (req, res) => {
    let user = req.body;
    let users = get_all_users();
    
    if (users.find(x => x.email === user.email || x.phone === user.phone)) {
        res.status(400).send({ result: "Пользователь уже существует в базе данных." });
        return;
    }

    update_database(users, user);
    res.status(200).send({ result: "Пользователь был добавлен" });
};

module.exports.find_user = (req, res) => {
    const email = req.query.email;

    if (!email) {
        res.status(400).send({ result: "FAIL", message: "Некорректный ввод." });
        return;
    }

    const user = get_all_users().find(x => x.email === email);

    if (user) {
        res.status(200).send({ result: "OK", message: "Пользователь найден!", user: user });
    } else {
        res.status(404).send({ result: "FAIL", message: "Такого пользователя нет в базе данных." });
    }
}

module.exports.second = (_, res) => {
    res.sendFile(path.join(__dirname, "..", FOLDER, SECOND));
}
