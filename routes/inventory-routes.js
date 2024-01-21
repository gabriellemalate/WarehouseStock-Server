const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

router
    .route("/")
    .get(inventoryController.index)
    .post(inventoryController.createItem);

router
    .route("/:id")
    .delete(inventoryController.deleteItem)
    .put(inventoryController.editInventoryItem);
//     .get(userController.findOne)
//     .patch(userController.update)
//     .delete(userController.remove);


// router
//     .route("/:id/posts")
//     .get(userController.posts);

    .get(inventoryController.getInventoryItem)
    .put(inventoryController.editInventoryItem);

module.exports = router;