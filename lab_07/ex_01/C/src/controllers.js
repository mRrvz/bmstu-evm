"use strict";

const axios = require("axios");

const CARS_SERVER = "http://localhost:4001/";
const INSERT_QUERY = "insert/record";
const SELECT_QUERY = "select/record";
const STOCKS_SERVER = "http://localhost:4002/";

const HOME_PAGE = "index.ejs";
const CREATE_CAR_PAGE = "create_car.ejs";
const CREATE_STOCK_PAGE = "create_stock.ejs";
const SEARCH_CAR_PAGE = "search_car.ejs";
const SEARCH_STOCK_PAGE = "search_stock.ejs";
const CAR_PAGE = "car.ejs";
const STOCK_PAGE = "stock.ejs";

module.exports.render_create_car = (_, res) => {
    res.render(CREATE_CAR_PAGE, { meta: {} });
}

module.exports.create_car = (req, res) => {
    axios.post(CARS_SERVER + INSERT_QUERY, {
        name: req.body.name,
        price: req.body.price
    }).then(result => {
        if (result.status !== 200)
            throw Error(result.data.result);

        res.status(200).render(CREATE_CAR_PAGE, { meta: { log: "Машина была зарегистрированна" } });
    }).catch(err => {
        res.status(400).render(CREATE_CAR_PAGE, { meta: { error: `Невозможно зарегистрировать машину: ${err}!` } });
    });
}

module.exports.search_car = (_, res) => {
    res.render(SEARCH_CAR_PAGE);
}

module.exports.show_car = (req, res) => {
    axios.get(CARS_SERVER + SELECT_QUERY, {
        params: {
            name: req.query.name
        }
    }).then(result => {
        res.status(200).render(CAR_PAGE, { car: result.data.car, error: null });
    }).catch(() => {
        res.status(400).render(CAR_PAGE, { car: {}, error: "Машина не найдена" });
    })
}

module.exports.render_create_stock = (_, res) => {
    res.render(CREATE_STOCK_PAGE, { meta: {} });
}

module.exports.create_stock = (req, res) => {
    axios.post(STOCKS_SERVER + INSERT_QUERY, {
        name: req.body.name,
        cars: req.body.cars.split(' ').filter(str => str !== '')
    }).then(result => {
        console.log(`RESULT: ${result}`)
        res.status(200).render(CREATE_STOCK_PAGE, { meta: { log: "Склад был зарегистрирован" } });
    }).catch(err => {
        res.status(400).render(CREATE_STOCK_PAGE, { meta: { error: `Невозможно зарегистрировать склад: ${err}` } });
    });
}

module.exports.search_stock = (_, res) => {
    res.render(SEARCH_STOCK_PAGE);
}

module.exports.show_stock = (req, res) => {
    axios.get(STOCKS_SERVER + SELECT_QUERY, {
        params: {
            name: req.query.name
        }
    }).then(result => {
        console.log(result.data.stock);
        res.status(200).render(STOCK_PAGE, { stock: result.data.stock, error: null });
    }).catch(() => {
        res.status(400).render(STOCK_PAGE, { stock: {}, error: "Склад не найден" });
    })
}

module.exports.default_controller = (_, res) => {
    res.render(HOME_PAGE);
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
