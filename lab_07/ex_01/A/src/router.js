const Router = require("express").Router;

const controllers = require("./controllers");

const router = Router();

router.post("/insert/record", controllers.insert_record);
router.get("/select/record", controllers.select_record);
router.use(controllers.bad_request_controller);

module.exports = router;
