const express = require("express");
const bata = express();

const multer = require("multer");
const path = require("path");

const bodyParser = require("body-parser");

bata.use(bodyParser.urlencoded({ extended: true }));
bata.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });

const bataController = require("../controllers/bataController");

// bata.post('/importBata', upload.single('file', bataController.importBata));

bata.post("/importBata", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Process the file
  res.send("File uploaded successfully.");
});

module.exports = bata;
