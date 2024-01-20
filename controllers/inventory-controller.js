const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
    try {
        const data = await knex("inventories")
            .join("warehouses", "warehouse_id", "warehouses.id")
            .select("inventories.id", "item_name", "category", "status", "quantity", "warehouse_name");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving from Inventories: ${error}`);
    }
};

const createItem = async (req, res) =>  {
    let { warehouse_id, item_name, description, category, status, quantity } = req.body;

    if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
        res.status(400).json({
            message: "Please provide item name, item description, category, status, quantity, and warehouse id in the request"
        })
    }

    if (isNaN(quantity)) {
        res.status(400).send({
            message: "Please provide a numerical quantity"
        });
    }

    try {
        const result = await knex('inventories').insert(req.body);

        const newInventoryId = result[0];

        const createdInventoryItem = await knex
            .select("id", "item_name", "description", "category", "status", "quantity", "warehouse_id")
            .from("inventories")
            .where({ id: newInventoryId });

        res.status(201).json(createdInventoryItem);

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new inventory item: ${error}`
        });
    }
}


const editInventoryItem = async (req, res) => {
    let { warehouse_id, item_name, description, category, status, quantity } = req.body;

    if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
        res.status(400).json({
            message: "Please provide warehouse id, item name, description, category, status, and quantity in the request"
        })
    }

    if (isNaN(quantity)) {
        res.status(400).send({
            message: "Quantity must be a numerical input."
        })
    }

    try {
        const rowsUpdated = await knex('inventories')
            .where({ id: req.params.id })
            .update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: `Inventory item with ID ${req.params.id} was not found`
            });
        }

        const updatedInventoryItem = await knex("inventories")
            .select("id", "warehouse_id", "item_name", "description", "category", "status", "quantity")
            .where({ id: req.params.id });

        res.status(200).json(updatedInventoryItem);

    } catch (error) {
        res.status(500).json({
            message: `Unable to update invetory item with ID ${req.params.id}: ${error}`
        })
    }
}

module.exports = {
    index,
    createItem,
    editInventoryItem
};