const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

router
    .route("/")
    .get(inventoryController.index)
    .post(inventoryController.createItem);

router.route('/unique')
.get(inventoryController.getUniqueCategories);

router
    .route("/:id")
    .get(inventoryController.getInventoryItem)
    .put(inventoryController.editInventoryItem);

module.exports = router;