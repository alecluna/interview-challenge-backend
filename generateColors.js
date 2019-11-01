import fs from "fs";
import fetch from "node-fetch";

const generateColors = () => {
  let counter = 130;

  console.log("Generating random colors...");
  let colorPromises = []; //generate ~100 random colors through async fetch to colors api

  //negative while slightly boosts performance over traditional for/while loops
  while (--counter) {
    let randhex = "" + ((Math.random() * 0xffffff) << 0).toString(16);
    colorPromises.push(getColor(randhex));
  }

  return Promise.all(colorPromises) //filters out null values
    .then(colorsMaybeNull => colorsMaybeNull.filter(c => c)) //
    .then(colorsNotNull => {
      fs.writeFileSync("colors.json", JSON.stringify(colorsNotNull));
      console.log("List of Colors: ");
      console.log(colorsNotNull);
      return colorsNotNull;
    })
    .catch(err => console.log(err));
};

const getColor = async color => {
  let colorVal;
  let jsonColor = {
    hexvalue: color,
    color: ""
  };

  try {
    let response = await fetch(`http://thecolorapi.com/id?hex=${color}`, {
      "Content-Type": "application/json"
    });
    colorVal = await response.text();
    let colorValParsed = JSON.parse(colorVal);
    jsonColor.color = colorValParsed.name.value;
    console.log("\nColor: " + jsonColor.color);
  } catch (err) {
    console.log("Error: " + err);
    return null;
  }

  return jsonColor;
};

generateColors();
