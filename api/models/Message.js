"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Message extends Model {}

	Message.init(
		{/*
            message_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},*/
			message_content: {
				// Twilio, a popular suite of messaging APIs, recommends that messages should be
				// no more than 320 characters in length
				type: DataTypes.STRING(320),
			}
		},
		{
			sequelize,
			modelName: "Message",
		}
	);

	Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: "sender_id",
            allowNull: false,
        }),
        Message.belongsTo(models.Listing, {
            foreignKey: "listing_id",
            allowNull: false,
        })
	};

	return Message;
};