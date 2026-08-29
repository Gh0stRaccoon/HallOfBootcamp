function validateContribution(req, res, next) {
  const { userId, projectContext, type, description } = req.body;

  if (!userId || !projectContext || !type || !description) {
    return res.status(400).json({
      message: 'userId, projectContext, type and description are required',
    });
  }

  if (typeof projectContext !== 'string' || projectContext.trim() === '') {
    return res.status(400).json({ message: 'projectContext must be a non-empty string' });
  }

  if (typeof type !== 'string' || type.trim() === '') {
    return res.status(400).json({ message: 'type must be a non-empty string' });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ message: 'description must be a non-empty string' });
  }

  next();
}

module.exports = validateContribution;
