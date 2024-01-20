const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller');

router.route('/')
    .get(warehouseController.getAllWarehouses)
    .post(warehouseController.createWarehouse);

router.route('/:id')
    .get(warehouseController.getWarehouseById)
    .put(warehouseController.updateWarehouse);

router.route('/:id/inventories')
    .get(warehouseController.getWarehouseInventory);

module.exports = router;
