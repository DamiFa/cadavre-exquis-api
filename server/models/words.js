'use strict';

module.exports = (sequelize, DataTypes) => {
  const Words = sequelize.define('Words', {
    word: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Words.associate = function(models) {
    Words.belongsTo(models.Quotes, {
      foreignKey: 'quoteId',
      onDelete: 'CASCADE',
    });
  };
  return Words;
};