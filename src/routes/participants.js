const express = require('express');
const router = express.Router();
const { getParticipants, createParticipant } = require('../controllers/participantsController');
const validateParticipant = require('../middlewares/validateParticipant');

router.get('/', getParticipants);
router.post('/', validateParticipant, createParticipant);

module.exports = router;
