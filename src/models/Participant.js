const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participant = sequelize.define(
  'Participant',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'graduated'),
      allowNull: false,
      defaultValue: 'active',
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    leftAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cohortId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'participants',
    underscored: true,
    timestamps: true,
  }
);

module.exports = Participant;
