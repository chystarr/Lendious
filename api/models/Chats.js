"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class Chats extends Model {}

	Chats.init(
		{
			chat_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
				notEmpty: true,
				validate: {},
			}
		},
		{
			sequelize,
			modelName: "Chats",
		}
	);

	 Chats.associate = (models) => {
	}; 

	

	return Chats;
};