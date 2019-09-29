"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Colors = require("../../colors.json");
    let colorsArray = [];
    let count = 0;
    Colors.forEach(color => {
      colorsArray.push({
        id: (count += 1),
        color: color.color,
        hexvalue: color.hexvalue,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    return queryInterface.bulkInsert("Colors", colorsArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Colors", null);
  }
};
