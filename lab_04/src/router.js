const Router = require("express").Router;

const controllers = require("./controllers");

const router = Router();

router.post("/max3", controllers.max3)

module.exports = router;

//const router = Router();
