const User = require('./User');
const Cohort = require('./Cohort');
const Participant = require('./Participant');
const Contribution = require('./Contribution');

User.hasMany(Participant, { foreignKey: 'userId' });
Participant.belongsTo(User, { foreignKey: 'userId' });

Cohort.hasMany(Participant, { foreignKey: 'cohortId' });
Participant.belongsTo(Cohort, { foreignKey: 'cohortId' });

User.hasMany(Contribution, { foreignKey: 'userId' });
Contribution.belongsTo(User, { foreignKey: 'userId' });

Cohort.hasMany(Contribution, { foreignKey: 'cohortId' });
Contribution.belongsTo(Cohort, { foreignKey: 'cohortId' });

module.exports = {
  User,
  Cohort,
  Participant,
  Contribution,
};
