const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const aniController = require('../controllers/aniController.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/importAni', upload.single('file'), aniController.importAni);

module.exports = router;
