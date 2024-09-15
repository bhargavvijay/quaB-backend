const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Enforces SSL (required for some cloud providers like Render)
        rejectUnauthorized: false // Allows self-signed certificates (common for cloud-hosted DBs)
      }
    }
  });
module.exports = sequelize;
