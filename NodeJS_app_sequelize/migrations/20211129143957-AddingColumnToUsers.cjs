
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "age" , Sequelize.INTEGER )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn("users", "age" );
  }
}

// export { migration };