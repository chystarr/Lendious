"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ItemType extends Model {}

	ItemType.init(
		{
            itemType_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			type: {
				type: DataTypes.STRING,
				notEmpty: true,
				allowNull: false,
				unique: true,
				validate: {},
			}
		},
		{
			sequelize,
			modelName: "ItemType",
		}
	);

	return ItemType;
};