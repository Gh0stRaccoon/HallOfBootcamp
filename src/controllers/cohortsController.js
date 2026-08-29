const { Cohort } = require('../models');

async function getCohorts(req, res) {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createCohort(req, res) {
  try {
    const cohort = await Cohort.create(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getCohorts,
  createCohort,
};
