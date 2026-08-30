const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cohort = sequelize.define(
  'Cohort',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'cohorts',
    underscored: true,
    timestamps: true,
  }
);

module.exports = Cohort;
