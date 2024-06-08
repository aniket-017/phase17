const express = require("express");
const router = express.Router();
const multer = require("multer");
const pController = require("../controllers/pController");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/importPlates", upload.single("file"), pController.importPlates);

module.exports = router;
