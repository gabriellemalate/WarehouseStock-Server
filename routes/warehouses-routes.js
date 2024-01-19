const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller');

router.route('/')
    .post(warehouseController.createWarehouse);

router.route('/:id')
    .put(warehouseController.updateWarehouse);

module.exports = router;