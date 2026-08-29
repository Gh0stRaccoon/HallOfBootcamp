const { Contribution, User, Cohort } = require('../models');

async function getContributions(req, res) {
  try {
    const contributions = await Contribution.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Cohort, attributes: ['id', 'name', 'slug'] },
      ],
    });
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createContribution(req, res) {
  try {
    const contribution = await Contribution.create(req.body);
    res.status(201).json(contribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getContributions,
  createContribution,
};
