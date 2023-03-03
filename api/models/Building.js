"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Building extends Model {}

	Building.init(
		{
			name: {
				type: DataTypes.STRING,
				notEmpty: true,
				allowNull: false,
				unique: true,
				validate: {},
			}
		},
		{
			sequelize,
			modelName: "Building",
		}
	);

	return Building;
};