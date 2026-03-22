const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '+07:00',
        logging: false,
    }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Koneksi database berhasil! :)");
  } catch (error) {
    console.error("Koneksi database gagal! :(", error);
  }
};

module.exports = { sequelize, connectDB };