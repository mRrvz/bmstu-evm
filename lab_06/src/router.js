"use strict";

const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.get("/games", controllers.render_games)
router.get("/personal", controllers.render_personal);
router.post("/login", controllers.login);
router.get("/exit", controllers.exit);

router.get("/", controllers.default_controller);

module.exports = router;
