"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Message extends Model {}

	Message.init(
		{
            message_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			sender_name: {
				type: DataTypes.STRING,
				notEmpty: true,
				allowNull: false,
			},
			message_content: {
				type: DataTypes.STRING(320),
			},
			date_sent: {
				type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
			}
		},
		{
			sequelize,
			modelName: "Message",
		}
	);

	Message.associate = (models) => {
        Message.belongsTo(models.Listing, {
            foreignKey: "listing_id",
            allowNull: false,
        })
	};

	return Message;
};
