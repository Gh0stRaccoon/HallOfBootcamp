const express = require('express');
const router = express.Router();
const { getCohorts, createCohort } = require('../controllers/cohortsController');
const validateCohort = require('../middlewares/validateCohort');

router.get('/', getCohorts);
router.post('/', validateCohort, createCohort);

module.exports = router;
