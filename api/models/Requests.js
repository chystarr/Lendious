"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {}

  Request.init(
    {
      item_requested: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 250],
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Request",
    }
  );

  Request.associate = (models) => {
    // associations can be defined here
    Request.belongsTo(models.Building, {
			foreignKey: "building_id",
			allowNull: false,
		},

    Request.belongsTo(models.User, {
       foreignKey: "requester_id",
       allowNull: false
   }))
  };

  return Request;
};
