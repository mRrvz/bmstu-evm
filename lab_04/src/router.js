const router = require("express").Router();
const controllers = require("./controllers");

router.post("/max3", controllers.max3)
router.post("/index", controllers.get_by_index)

module.exports = router;

