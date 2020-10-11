"use strict";

const router = require("express").Router();
const controllers = require("./controllers");

router.get("/second", controllers.second);
router.post("/user", controllers.add_user);
router.get("/search", controllers.find_user)


module.exports = router;
