"use strict";
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      hexvalue: DataTypes.STRING,
      color: DataTypes.STRING
    },
    {}
  );

  return Color;
};
