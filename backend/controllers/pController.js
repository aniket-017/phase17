const Plate = require("../models/plateModel");
const csv = require("csvtojson");
const path = require("path");

const importPlates = async (req, res) => {
  console.log("Reached importPlates");
  try {
    const plateData = [];

    await csv()
      .fromFile(req.file.path)
      .then((response) => {
        response.forEach((row) => {
          plateData.push({
            plateType: row.plateType,
            partNo: row.partNo,
            material: row.material,
            thickness: row.thickness,
            width: row.width,
            length: row.length,
            surfaceFinish: row.surfaceFinish,
            usage: row.usage,
            pattern: row.pattern,
            grade: row.grade,
            certification: row.certification,
            description: row.description,
          });
        });
      });

    await Plate.insertMany(plateData);

    res.status(200).send({ success: true, msg: "CSV imported" });
  } catch (error) {
    console.log("Error in importPlates");
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { importPlates };
