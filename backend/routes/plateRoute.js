const express = require('express');
const { getAllPlates, createPlate, updatePlate, deletePlate, getPlateDetails } = require('../controllers/plateController');
const router = express.Router();

router.route("/plates").get(getAllPlates);
router.route("/plate/new").post(createPlate);
router.route('/plate/:id').delete(deletePlate);
router.route('/plate/:id').put(updatePlate);
router.route('/plate/:id').get(getPlateDetails);

module.exports = router;
