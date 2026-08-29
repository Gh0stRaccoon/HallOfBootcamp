const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');

router.get('/', getUsers);
router.post('/', validateUser, createUser);

module.exports = router;
