const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../util/database.js');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = Order