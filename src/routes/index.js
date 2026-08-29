const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const cohortsRouter = require('./cohorts');
const participantsRouter = require('./participants');
const contributionsRouter = require('./contributions');

router.get('/', (req, res) => {
  res.json({ message: 'Hall Of Bootcamp API' });
});

router.use('/users', usersRouter);
router.use('/cohorts', cohortsRouter);
router.use('/participants', participantsRouter);
router.use('/contributions', contributionsRouter);

module.exports = router;
