const mongoose = require("mongoose");
const Plate = require("../models/plateModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createPlate = catchAsyncErrors(async (req, res, next) => {
  try {
    const plate = await Plate.create(req.body);

    res.status(201).json({
      success: true,
      plate,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllPlates = catchAsyncErrors(async (req, res, next) => {
  const platesCount = await Plate.countDocuments();
  const resultPerPage = 1000;

  const apiFeatures = new ApiFeatures(Plate.find(), req.query).search().pagination(resultPerPage).filter();
  const plates = await apiFeatures.query;

  res.status(200).json({
    success: true,
    plates,
    platesCount,
    resultPerPage,
  });
});

exports.getPlateDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const plate = await Plate.findById(req.params.id);

    if (!plate) {
      return next(new ErrorHander("Plate not found", 404));
    }

    res.status(200).json({
      success: true,
      plate,
    });
  } catch (error) {
    next(error);
  }
});

exports.updatePlate = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    let plate = await Plate.findById(id);

    if (!plate) {
      return next(new ErrorHander("Plate not found", 404));
    }

    plate = await Plate.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      plate,
    });
  } catch (error) {
    next(error);
  }
});

exports.deletePlate = catchAsyncErrors(async (req, res, next) => {
  try {
    const plate = await Plate.findById(req.params.id);

    if (!plate) {
      return next(new ErrorHander("Plate not found", 404));
    }

    await plate.deleteOne();

    res.status(200).json({
      success: true,
      message: "Plate deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
