"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class Messages extends Model {}

	Messages.init(
		{
			message_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},

            message: {
                type: DataTypes.STRING,
                notEmpty: true
            }
		},
		{
			sequelize,
			modelName: "Messages",
		}
	);

	 Messages.associate = (models) => {
        Messages.belongsTo(models.User, {
            foreignKey: "user_id",
            allowNull: false
        }), 

        Messages.belongsTo(models.Chats, {
            foreignKey: "chat_id",
            allowNull: false
        })
	}; 

	

	return Messages;
};