const Sequelize = require("sequelize");

const sequelizeConnection = new Sequelize("hello_world_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConnection = sequelizeConnection;

db.book = require("./book.model.js")(sequelizeConnection, Sequelize);

module.exports = db;
