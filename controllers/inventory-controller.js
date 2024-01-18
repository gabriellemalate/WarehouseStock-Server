const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
    res.send("you've hit the /inventory page! there's nothing here yet")
};

module.exports = {
    index
};