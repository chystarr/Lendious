"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Listing extends Model {}

	Listing.init(
		{
			name: {
				type: DataTypes.STRING,
				notEmpty: true,
				allowNull: false,
				validate: {},
			},
			compensation: {
				type: DataTypes.INTEGER,
			},
			range_start: {
				type: DataTypes.DATE,
				validate: {},
			},
            range_end: {
                type: DataTypes.DATE,
                validate: {},
            },
            condition: {
                type: DataTypes.STRING
            },
            item_description: {
                type: DataTypes.STRING,
                notEmpty: true,
                validate: {}
            }
		},
		{
			sequelize,
			modelName: "Listing",
		}
	);

	Listing.associate = (models) => {
		Listing.belongsTo(models.Building, {
			foreignKey: "building_id",
			allowNull: false,
		}),

         Listing.belongsTo(models.User, {
            foreignKey: "lender_id",
            allowNull: false
        }), 

        Listing.belongsTo(models.User, {
            foreignKey: "borrower_id",
            allowNull: true
        }),

        Listing.belongsTo(models.ItemType, {
            foreignKey: "item_type_id",
            allowNull: false
        })
	};

	return Listing;
};

 {/*listing_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},*/}