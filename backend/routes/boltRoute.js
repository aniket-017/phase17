const express = require('express');
const { getAllBolts, createBolt, updateBolt, deleteBolt, getBoltDetails } = require('../controllers/boltController');
const router = express.Router();

router.route("/bolts").get(getAllBolts);
router.route("/bolt/new").post(createBolt);
router.route('/bolt/:id').delete(deleteBolt);
router.route('/bolt/:id').put(updateBolt);
router.route('/bolt/:id').get(getBoltDetails);

module.exports = router;
