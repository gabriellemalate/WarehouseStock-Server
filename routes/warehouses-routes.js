const router = require("express").Router();
const warehouseController = require("../controllers/warehouses-controller");

router.route("/").post(warehouseController.createWarehouse);

router.route("/:id").put(warehouseController.updateWarehouse);

router.route("/:id").get(warehouseController.getWarehouseById);

module.exports = router;
