'use strict'
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: DataTypes.INTEGER
  }, {})
  List.associate = function (models) {
    List.belongsTo(models.User)
    List.hasMany(models.Card)
  }
  return List
}
