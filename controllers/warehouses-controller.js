const knex = require("knex")(require("../knexfile"));
const { emailIsValid, phoneNumberIsValid } = require("../utils/validationUtils");

const createWarehouse = async (req, res) => {
    let { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
        res.status(400).json({
            message: "Please provide warehouse name, street address, city, country, warehouse contact name, contact position, contact phone number, and contact email in the request"
        })
    }

    if (!emailIsValid(contact_email) || !phoneNumberIsValid(contact_phone)) {
        res.status(400).send({
            message: "Please provide contact email in the format 'yourname@example.com' and contact phone number in the format in the format '+1 (234) 567-8910'"
        })
    }

    try {
        const result = await knex('warehouses').insert(req.body);

        const newUserId = result[0];

        const createdWarehouse = await knex
            .select("id", "warehouse_name", "address", "city", "country", "contact_name", "contact_position", "contact_phone", "contact_email")
            .from("warehouses")
            .where({ id: newUserId });

        res.status(201).json(createdWarehouse);

    } catch (error) {
        res.status(500).json({
            message: `Unable to create new warehouse: ${error}`
        })
    }
}

const updateWarehouse = async (req, res) => {
    let { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = req.body;

    if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
        res.status(400).json({
            message: "Please provide warehouse name, street address, city, country, warehouse contact name, contact position, contact phone number, and contact email in the request"
        })
    }

    if (!emailIsValid(contact_email) || !phoneNumberIsValid(contact_phone)) {
        res.status(400).send({
            message: "Please provide contact email in the format 'yourname@example.com' and contact phone number in the format in the format '+1 (234) 567-8910'"
        })
    }

    try {
        const rowsUpdated = await knex('warehouses')
            .where({ id: req.params.id })
            .update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            });
        }

        const updatedWarehouse = await knex
            .select("id", "warehouse_name", "address", "city", "country", "contact_name", "contact_position", "contact_phone", "contact_email")
            .from("warehouses")
            .where({ id: req.params.id });

        res.status(200).json(updatedWarehouse);

    } catch (error) {
        res.status(500).json({
            message: `Unable to update warehouse with ID ${req.params.id}: ${error}`
        })
    }
}

const getWarehouseById = async (req, res) => {
    try {
        const { id } = req.params;
        const warehouse = await knex('warehouses').where({ id }).first();

        if (!warehouse) {
            // If the warehouse with the specified ID is not found, send a 404 response
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json(warehouse);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get warehouse' });
    }
}

const getWarehouseInventory = async (req, res) => {
    try {
        const data = await knex("inventories")
            .join("warehouses", "warehouse_id", "warehouses.id")
            .select("inventories.id", "item_name", "category", "status", "quantity")
            .where({ warehouse_id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving inventories from warehouse ${req.params.id}: ${error}`);
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await knex('warehouses').where({ id }).del();
        if (!deleted) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json({ message: 'Warehouse deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete warehouse' });
    }
}

const getAllWarehouses = async (_req, res) => {
    try {
        const data = await knex("warehouses")
            .select("id", "warehouse_name", "address", "city", "country", "contact_name", "contact_position", "contact_phone", "contact_email");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving inventories from all warehouses: ${error}`);
    }
};

const getUniqueWarehouses = async (_req, res) => {
    try {
        const data = await knex("warehouses")
            .select("id")
            .distinct("warehouse_name");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving unique warehouses: ${error}`);
    }
};


module.exports = {
    createWarehouse,
    updateWarehouse,
    getAllWarehouses,
    getWarehouseById,
    getWarehouseInventory,
    getUniqueWarehouses,
    deleteWarehouse
};