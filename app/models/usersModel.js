const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const User = sequelize.define(
  'User',
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    displayname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    profilePicture: {
      type: DataTypes.BLOB('medium'),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateJoined: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    followers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
