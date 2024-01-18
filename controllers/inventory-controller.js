const knex = require("knex")(require("../knexfile"));

// const index = async (_req, res) => {
//     res.send("you've hit the /inventory page! there's nothing here yet")
// };

const index = async (_req, res) => {
    try {
        const data = await knex("inventories")
            .join("warehouses", "warehouse_id", "warehouses.id")
            .select("inventories.id", "warehouse_name");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving Inventories: ${error}`);
    }
};

module.exports = {
    index
};