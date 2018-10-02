'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quotes = sequelize.define('Quotes', {
    completed: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Quotes.associate = function(models) {
    Quotes.hasMany(models.Words, {
      foreignKey: 'quoteId',
      as: 'words'
    })
    Quotes.hasMany(models.Authors, {
      foreignKey: 'quoteId',
      as: 'authors'
    });
  };
  return Quotes;
};