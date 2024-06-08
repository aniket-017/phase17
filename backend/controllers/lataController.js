const User = require("../models/lataModel.js");
const csv = require("csvtojson");

const importLata = async (req, res) => {
  try {
    const userData = [];

    await csv()
      .fromFile(req.file.path)
      .then((response) => {
        for (let x = 0; x < response.length; x++) {
          userData.push({
            boltType: response[x].boltType,
            partNo: response[x].partNo,
            standard: response[x].standard,
            certification: response[x].certification,
            surfaceFinish: response[x].surfaceFinish,
            brand: response[x].brand,
            industryStandard: response[x].industryStandard,
            material: response[x].material,
            threadSize: response[x].threadSize,
            length: response[x].length,
            description: response[x].description,
          });
        }
      });

    await User.insertMany(userData);

    res.send({ status: 200, success: true, msg: "CSV imported" });
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};

module.exports = {
  importLata,
};
