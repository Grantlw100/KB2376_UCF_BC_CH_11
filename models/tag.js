const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {
    static checkString(value) {
        if (typeof value !== 'string') {
        throw new Error('Tag name must be a string');
        }
        return true;
    }
    static checkNull(value) {
        if (value === null) {
        throw new Error('Tag name cannot be null');
        }
        return true;
    }
    static checkEmpty(value) {
        if (value === '') {
        throw new Error('Tag name cannot be empty');
        }
        return true;
    }
    static checkLength(value) {
        if (value.length < 3 || value.length > 30) {
        throw new Error('Tag name must be between 3 and 30 characters');
        }
        return true;
    }
    static checkId(value) {
        if (isNaN(value)) {
        throw new Error('Tag ID must be a number');
        }
        return true;
    }
    static checkForeignKey(value) {
        if (isNaN(value)) {
        throw new Error('Tag ID must be a number');
        }
        return true;
    }
    static checkForeignKeyNull(value) {
        if (value === null) {
        throw new Error('Tag ID cannot be null');
        }
        return true;
    }
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
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
