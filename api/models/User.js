"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}

	User.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
				notEmpty: true,
				validate: {},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				notEmpty: true,
				validate: {
					isEmail: true,
				},
			},
			passwordHash: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.VIRTUAL,
				allowNull: false,
				validate: {
					isLongEnough: (val) => {
						if (val.length < 7) {
							throw new Error(
								"password has to be longer than 7 characters"
							);
						}
					},
				},		
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	/*  User.associate = (models) => {
		User.hasMany(models.Listings, {
			foreignKey: 'owner_id',
			as: 'owner_id',
			allowNull: false
		}); 
	}; */ 

	User.beforeSave((user, options) => {
		if (user.password) {
			user.passwordHash = bcrypt.hashSync(user.password, 10);
			console.log(user.passwordHash);
		}
	});

	return User;
};
