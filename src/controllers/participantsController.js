const { Participant, User, Cohort } = require('../models');

async function getParticipants(req, res) {
  try {
    const participants = await Participant.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Cohort, attributes: ['id', 'name', 'slug'] },
      ],
    });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createParticipant(req, res) {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getParticipants,
  createParticipant,
};
