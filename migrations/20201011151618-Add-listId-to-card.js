'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Cards', 'ListId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Lists',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Cards', 'ListId')
  }
}
