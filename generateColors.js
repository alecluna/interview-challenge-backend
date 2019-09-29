import fs from "fs";
import fetch from "node-fetch";

// delays
const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const generateColors = () => {
  let colorList = [];
  let counter = 130;

  console.log("Generating random colors...");

  //generate ~100 random colors through async fetch to colors api
  while (counter != 0) {
    let randhex = "" + ((Math.random() * 0xffffff) << 0).toString(16);
    let newColor = getColor(randhex);

    newColor
      .then(color => {
        if (color) colorList.push(color);
      })
      .catch(err => console.log(err));

    counter--;
  }

  delay(4000).then(() => {
    Promise.all(colorList)
      .then(done => {
        fs.writeFileSync("colors.json", JSON.stringify(done));
        console.log("List of Colors: ");
        console.log(done);
      })
      .catch(err => console.log(err));
  });

  return colorList;
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
    return null;
  }

  return jsonColor;
};

generateColors();
