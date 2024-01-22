const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller');

router.route('/api/warehouses')
    .get(warehouseController.getAllWarehouses)
    .post(warehouseController.createWarehouse);

router.route('/unique')
    .get(warehouseController.getUniqueWarehouses);

router.route('/api/warehouses/:id')    
    .get(warehouseController.getWarehouseById)
    .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);

router.route('/api/warehouses/:id/inventories')    
    .get(warehouseController.getWarehouseInventory);
    
module.exports = router;
