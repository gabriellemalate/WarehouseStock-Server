const knex = require("knex")(require("../knexfile"));

// const index = async (_req, res) => {
//     res.send("you've hit the /inventory page! there's nothing here yet")
// };

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

const deleteItem = async (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete item with id: ${id}`);
    try {
        const deleted = await knex('inventories').where({ id }).del();
        console.log(`Delete operation result: ${deleted}`); 
        if (!deleted) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        console.error('Error deleting item:', err); 
        res.status(500).json({ message: 'Failed to delete item' });
    }
};

module.exports = {
    index,
    deleteItem
};