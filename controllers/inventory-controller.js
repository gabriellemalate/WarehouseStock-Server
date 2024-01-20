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
        })
    }

    try {
        const result = await knex('inventory').insert(req.body);

        const newInventoryId = result[0];

        const createdInventoryItem = await knex
            .select("id", "item_name", "description", "category", "status", "quantity", "warehouse_id")
            .from("inventory")
            .where({ id: newInventoryId });

        res.status(201).json(createdInventoryItem);

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new inventory item: ${error}`
        })
    }
}

module.exports = {
    index,
    createItem
};