const express = require('express');
const { getAllScrews, createScrew, updateScrew, deleteScrew, getScrewDetails } = require('../controllers/screwController');
const router = express.Router();

router.route("/screws").get(getAllScrews);
router.route("/screw/new").post(createScrew);
router.route('/screw/:id').delete(deleteScrew);
router.route('/screw/:id').put(updateScrew);
router.route('/screw/:id').get(getScrewDetails);

module.exports = router;
