const db = require("./config/db");

const setup = async () => {
  try {
    // Crear tabla consultas
    const existeConsultas = await db.schema.hasTable("consultas");
    if (!existeConsultas) {
      await db.schema.createTable("consultas", (table) => {
        table.increments("id").primary();
        table.string("ciudad").notNullable();
        table.float("lat");
        table.float("lon");
        table.json("respuesta");
        table.timestamp("fecha").defaultTo(db.fn.now());
      });
      console.log("Tabla 'consultas' creada");
    }

    // Crear tabla cache
    const existeCache = await db.schema.hasTable("cache");
    if (!existeCache) {
      await db.schema.createTable("cache", (table) => {
        table.increments("id").primary();
        table.string("ciudad").unique().notNullable();
        table.json("datos").notNullable();
        table.timestamp("fechaCreacion").defaultTo(db.fn.now());
        table.timestamp("expiracion").nullable(); // <-- aquí cambiamos
      });
      console.log("Tabla 'cache' creada");
    }

    console.log("Todas las tablas están listas!");
    process.exit(0);

  } catch (error) {
    console.error("Error creando tablas:", error);
    process.exit(1);
  }
};

setup();
