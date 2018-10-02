'use strict';
module.exports = (sequelize, DataTypes) => {
  const Authors = sequelize.define('Authors', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Authors.associate = function(models) {
    Authors.belongsTo(models.Quotes, {
      foreignKey: 'quoteId',
      onDelete: 'CASCADE',
    });
  };
  return Authors;
};