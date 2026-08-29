function validateCohort(req, res, next) {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: 'name and slug are required' });
  }

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'name must be a non-empty string' });
  }

  if (typeof slug !== 'string' || slug.trim() === '') {
    return res.status(400).json({ message: 'slug must be a non-empty string' });
  }

  next();
}

module.exports = validateCohort;
