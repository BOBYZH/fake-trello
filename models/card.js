'use strict'
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: DataTypes.INTEGER
  }, {})
  Card.associate = function (models) {
    Card.belongsTo(models.List)
  }
  return Card
}
