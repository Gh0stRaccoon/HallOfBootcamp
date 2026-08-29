const express = require('express');
const router = express.Router();
const { getContributions, createContribution } = require('../controllers/contributionsController');
const validateContribution = require('../middlewares/validateContribution');

router.get('/', getContributions);
router.post('/', validateContribution, createContribution);

module.exports = router;
