const router = require("express").Router();
const controllers = require("./controllers");

router.post("/max3", controllers.max3)
router.post("/index", controllers.get_by_index)
router.post("/find_mod", controllers.find_mod)
router.post("/generate", controllers.generate)

module.exports = router;

