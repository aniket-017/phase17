const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const brewController = require("../controllers/brewController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/importBrew", upload.single("file"), brewController.importBrew);

module.exports = router;
