const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize('node-complete', 'root', 'gogo989', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;