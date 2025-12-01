const knex = require("knex");

const db = knex({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",      // tu contraseña de XAMPP
        database: "michiweather"
    }
});

module.exports = db;
