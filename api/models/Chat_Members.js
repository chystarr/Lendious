"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class Chat_Members extends Model {}

	Chat_Members.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
		},
		{
			sequelize,
			modelName: "Chat_Members",
		}
	);

	 Chat_Members.associate = (models) => {
        Chat_Members.belongsTo(models.User, {
            foreignKey: "user_id",
            allowNull: false
        }), 

        Chat_Members.belongsTo(models.Chats, {
            foreignKey: "chat_id",
            allowNull: false
        })
	}; 

	

	return Chat_Members;
};