"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class ListingImage extends Model {}

	ListingImage.init(
		{
            listing_image_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			image: {
				type: DataTypes.BLOB,
			}
		},
		{
			sequelize,
			modelName: "ListingImage",
		}
	);

	ListingImage.associate = (models) => {
        ListingImage.belongsTo(models.Listing, {
            foreignKey: "listing_id",
            allowNull: false,
        })
	};

	return ListingImage;
};