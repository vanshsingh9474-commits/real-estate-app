const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 23114, // <--- Yeh add karein
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: {                   // <--- Aiven ke liye SSL zaroori hai
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;