const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const sController = require("../controllers/sController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/importScrews", upload.single("file"), sController.importScrews);

module.exports = router;
