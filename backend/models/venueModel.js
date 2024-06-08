const mongoose = require('mongoose');

// MongoDB Venue Collection Schema
const venueSchema = new mongoose.Schema({

    ItemNo: { type: Number, required:true },
    Description: { type: String, required:true },
    standard : { type:String},
    SpecifiedStandard : { type:String},
    CertificationStatus : {type: String},
    SurfaceFinish : {type: String},
    HotForge:{type: String},
    ColdForge:{type: String},
    Shade: {type: String},
    CoatedMaterial: {type: String},
    MildSteelGrade: {type: Number},
    AlloySteelGrade: {type: Number},
    Brand: {type: String},
    // Colour: {type: String},
    // Texture: {type: String},
    // Combination: {type: String},

    ISN: {type: String},
    MOC: {type: String},
    RatingElec: {type: String},
    RatingTemp: {type: String},
    RatingPres: {type: String},
    RatingClass: {type: String},
    Size: {type: String},
    HSNCode: {type: String},
    GSTRate: {type: String},
    PackingDetails: {type: String},
    Um1toUm2: {type: String},
    Um2toUm1: {type: String},
    SubstituteUp: {type: String},
    SubstituteDown: {type: String},

// user:{


  //   type:String,
  //   ref:"User",
  //   // required:true,
  // },

  // createdAt:{
  //   type:Date,
  //   default:Date.now
  // }

});

module.exports = mongoose.model('Venue', venueSchema);



