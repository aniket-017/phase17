const Ani = require('../models/aniModel');
const csv = require('csvtojson');
const path = require('path');

const importAni = async (req, res) => {
  console.log("Reached importAni");
  try {
    const aniData = [];
    
    await csv()
      .fromFile(req.file.path)
      .then((response) => {
        response.forEach((row) => {
          aniData.push({
            name: row.Name,
            email: row.Email,
            mobile: row.Mobile,
          });
        });
      });

    await Ani.insertMany(aniData);

    res.status(200).send({ success: true, msg: "CSV imported" });
  } catch (error) {
    console.log("Error in importAni");
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { importAni };
