const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// Initialize tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}
// set up fields and rules for tag model
Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
