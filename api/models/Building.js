"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Building extends Model {}

	Building.init(
		{
            building_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
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

	Building.associate = (models) =>{
		Building.belongsToMany(models.User, {through: 'BuildingMembership'})
	};

	return Building;
};