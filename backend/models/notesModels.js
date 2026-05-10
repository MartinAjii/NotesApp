const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Notes = sequelize.define("Notes", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    judul: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    isi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tgl_dibuat: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'notes',
    timestamps: false
});

module.exports = Notes;