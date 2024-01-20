const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

router
    .route("/")
    .get(inventoryController.index)
    // .get((_req, res) => res.send("you've hit the /inventory page"))
    // .post(userController.add);

router
    .route("/:id")
    .delete(inventoryController.deleteItem);

// router
//     .route("/:id/posts")
//     .get(userController.posts);

module.exports = router;