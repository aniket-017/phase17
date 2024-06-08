const mongoose = require("mongoose");
const Screw = require("../models/screwModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


// const csv = require('csv-parser');
// const fs = require('fs');
// const xlsx = require('xlsx');




// Function to parse CSV file
const parseCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};


// Function to parse Excel file
const parseExcelFile = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};




exports.createScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    let screwsData = [];

    // Check if file is CSV or Excel
    if (req.file.originalname.endsWith('.csv')) {
      screwsData = await parseCSVFile(req.file.path);
    } else if (req.file.originalname.endsWith('.xlsx')) {
      screwsData = parseExcelFile(req.file.path);
    } else {
      return next(new ErrorHander('Invalid file format', 400));
    }

    // Validate and process screwsData as needed

    // Insert screwsData into database
    const insertedScrews = await Screw.insertMany(screwsData);

    res.status(201).json({
      success: true,
      screws: insertedScrews,
    });
  } catch (error) {
    next(error);
  }
});


exports.createScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    const screw = await Screw.create(req.body);

    res.status(201).json({
      success: true,
      screw,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllScrews = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body)
  const screwsCount = await Screw.countDocuments();
  const resultPerPage = 1000;

  const apiFeatures = new ApiFeatures(Screw.find(), req.query).search().pagination(resultPerPage).filter();
  const screws = await apiFeatures.query;

  res.status(200).json({
    success: true,
    screws,
    screwsCount,
    resultPerPage,
  });
});








exports.getScrewDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const screw = await Screw.findById(req.params.id);

    if (!screw) {
      return next(new ErrorHander("Screw not found", 404));
    }

    res.status(200).json({
      success: true,
      screw,
    });
  } catch (error) {
    next(error);
  }
});

exports.updateScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    let screw = await Screw.findById(id);

    if (!screw) {
      return next(new ErrorHander("Screw not found", 404));
    }

    screw = await Screw.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      screw,
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    const screw = await Screw.findById(req.params.id);

    if (!screw) {
      return next(new ErrorHander("Screw not found", 404));
    }

    await screw.deleteOne();

    res.status(200).json({
      success: true,
      message: "Screw deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
