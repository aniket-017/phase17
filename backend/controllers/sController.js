const Screw = require("../models/screwModel");
const csv = require("csvtojson");
const path = require("path");

const importScrews = async (req, res) => {
  console.log("Reached importScrews");
  try {
    const screwData = [];

    await csv()
      .fromFile(req.file.path)
      .then((response) => {
        response.forEach((row) => {
          screwData.push({
            partNo: row.partNo,
            screwType: row.screwType,
            standard: row.standard,
            certification: row.certification,
            surfaceFinish: row.surfaceFinish,
            brand: row.brand,
            industryStandard: row.industryStandard,
            material: row.material,
            threadSize: row.threadSize,
            length: row.length,
            rating: row.rating,
            description: row.description,
          });
        });
      });

    await Screw.insertMany(screwData);

    res.status(200).send({ success: true, msg: "CSV imported" });
  } catch (error) {
    console.log("Error in importScrews");
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { importScrews };
