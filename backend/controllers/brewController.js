const Brew = require("../models/boltModel");
const csv = require("csvtojson");
const path = require("path");

const importBrew = async (req, res) => {
  console.log("Reached importBrew");
  try {
    const brewData = [];

    await csv()
      .fromFile(req.file.path)
      .then((response) => {
        response.forEach((row) => {
          brewData.push({
            boltType: row.boltType,
            partNo: row.partNo,
            standard: row.standard,
            certification: row.certification,
            surfaceFinish: row.surfaceFinish,
            brand: row.brand,
            industryStandard: row.industryStandard,
            material: row.material,
            threadSize: row.threadSize,
            length: row.length,
            description: row.description,
          });
        });
      });

    await Brew.insertMany(brewData);

    res.status(200).send({ success: true, msg: "CSV imported" });
  } catch (error) {
    console.log("Error in importBrew");
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { importBrew };
