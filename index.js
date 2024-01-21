// Clear and set up new run
console.clear();
console.log("New run-------------------------------------------------------------------------------------");

// Import dependencies
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5050;
const knex = require('./knexfile.js');



// Configure our server
app.use(cors());
app.use(express.json());


// Print to console whenever anyone hits any endpoint on the server
app.use((req, _res, next) => {
    const moment = new Date(Date.now())
    console.log("hit type", req.method, "for", req.originalUrl, "at", moment.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    next();
})

// Basic response for home page
app.get("/", (_req, res) => {
    res.send("you've hit the home page. this means you can access our server =)");
})

// Set up routes for inventories
const inventoryRoutes = require("./routes/inventory-routes");
app.use("/inventory", inventoryRoutes);

// Set up routes for warehouses
const warehousesRoutes = require("./routes/warehouses-routes");
app.use('/warehouses', warehousesRoutes);

// Spin up server
app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));



