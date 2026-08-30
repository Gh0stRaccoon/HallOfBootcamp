const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { isValidUrl } = require('../helpers/validators');

const User = sequelize.define(
  'User',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidAvatarUrl(value) {
          if (!value || value === '') {
            return;
          }
          if (!isValidUrl(value)) {
            throw new Error('avatarUrl must be a valid URL');
          }
        },
      },
    },
    linkedInUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isValidLinkedInUrl(value) {
          if (!value || value === '') {
            return;
          }
          if (!isValidUrl(value)) {
            throw new Error('linkedInUrl must be a valid URL');
          }
        },
      },
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isValidGithubUrl(value) {
          if (!value || value === '') {
            return;
          }
          if (!isValidUrl(value)) {
            throw new Error('githubUrl must be a valid URL');
          }
        },
      },
    },
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: true,
  }
);

module.exports = User;
