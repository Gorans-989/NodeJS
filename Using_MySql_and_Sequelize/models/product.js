const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../util/database.js');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: Sequelize.STRING,
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;