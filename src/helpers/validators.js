function isValidUrl(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch (error) {
    return false;
  }
}

function isValidSocialProfile(value) {
  if (!value || value === '') {
    return true;
  }
  return isValidUrl(value);
}

module.exports = {
  isValidUrl,
  isValidSocialProfile,
};
