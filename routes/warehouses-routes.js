const router = require('express').Router();
const warehouseController = require('../controllers/warehouses-controller');

router.route('/')
    .post(warehouseController.createWarehouse);

module.exports = router;