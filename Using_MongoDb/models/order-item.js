const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../util/database.js');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    }
})

module.exports = OrderItem