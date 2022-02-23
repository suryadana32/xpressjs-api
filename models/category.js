'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name_category: DataTypes.STRING,
    slug: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
    tableName:'category',
    createdAt:'created_at',
    updatedAt:'updated_at',
  });
  return Category;
};