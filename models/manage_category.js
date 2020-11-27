'use strict';
module.exports = (sequelize, DataTypes) => {
  const manage_categories = sequelize.define('manage_categories', {
    name: DataTypes.STRING,
    parent_id: DataTypes.STRING,
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true,
    tableName: 'manage_categories'
  });
  manage_categories.associate = function(models) {
    // associations can be defined here
  };
  return manage_categories;
};
