const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller');

router.route('/')
    .get(warehouseController.getAllWarehouses)
    .post(warehouseController.createWarehouse);

router.route('/unique')
    .get(warehouseController.getUniqueWarehouses);

router.route('/:id')    
    .get(warehouseController.getWarehouseById)
    .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);

router.route('/:id/inventories')    
    .get(warehouseController.getWarehouseInventory);
    
module.exports = router;
