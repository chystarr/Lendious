"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {}

  Request.init(
    {
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
  };

  return Request;
};
