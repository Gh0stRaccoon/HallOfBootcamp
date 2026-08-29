const { isValidSocialProfile } = require('../helpers/validators');

function validateUser(req, res, next) {
  const { name, email, linkedInUrl, githubUrl } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }

  if (linkedInUrl && !isValidSocialProfile(linkedInUrl)) {
    return res.status(400).json({ message: 'linkedInUrl must be a valid URL' });
  }

  if (githubUrl && !isValidSocialProfile(githubUrl)) {
    return res.status(400).json({ message: 'githubUrl must be a valid URL' });
  }

  next();
}

module.exports = validateUser;
