function validateParticipant(req, res, next) {
  const { userId, cohortId, status } = req.body;

  if (!userId || !cohortId) {
    return res.status(400).json({ message: 'userId and cohortId are required' });
  }

  const validStatuses = ['active', 'inactive', 'graduated'];
  if (status && !validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ message: 'status must be one of active, inactive, or graduated' });
  }

  next();
}

module.exports = validateParticipant;
