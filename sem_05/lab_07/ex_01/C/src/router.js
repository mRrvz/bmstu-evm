const Router = require("express").Router;

const controllers = require("./controllers");

const router = Router();

router.get("/create-car", controllers.render_create_car);
router.post("/create-car", controllers.create_car);

router.get("/search-car", controllers.search_car);
router.get("/car", controllers.show_car);

router.get("/create-stock", controllers.render_create_stock);
router.post("/create-stock", controllers.create_stock);

router.get("/search-stock", controllers.search_stock);
router.get("/stock", controllers.show_stock);

router.post("/create-car", controllers.create_car);
router.use(controllers.default_controller);

module.exports = router;
