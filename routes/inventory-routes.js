const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

router
    .route("/")
    .get(inventoryController.index)
    .post(inventoryController.createItem);

router
    .route("/:id")
    .put(inventoryController.editInventoryItem);
//     .get(userController.findOne)
//     .patch(userController.update)
//     .delete(userController.remove);

// router
//     .route("/:id/posts")
//     .get(userController.posts);

module.exports = router;