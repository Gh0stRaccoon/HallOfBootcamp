const { User, Cohort, Participant, Contribution } = require('../../models');

async function seedBootcampData() {
  const users = await User.bulkCreate([
    {
      name: 'Ana García',
      email: 'ana@example.com',
      role: 'Frontend Developer',
      bio: 'Bootcamp participant focused on interfaces and UX.',
      avatarUrl: 'https://example.com/avatar-ana.png',
      linkedInUrl: 'https://linkedin.com/in/anagarcia',
      githubUrl: 'https://github.com/anagarcia',
    },
    {
      name: 'Luis Pérez',
      email: 'luis@example.com',
      role: 'Backend Developer',
      bio: 'Backend developer interested in APIs and clean architecture.',
      avatarUrl: 'https://example.com/avatar-luis.png',
      linkedInUrl: 'https://linkedin.com/in/luisperez',
      githubUrl: 'https://github.com/luisperez',
    },
  ], {
    ignoreDuplicates: true,
  });

  const cohorts = await Cohort.bulkCreate([
    {
      name: 'Bootcamp 2026 - Node.js',
      slug: 'bootcamp-2026-node',
      startDate: '2026-01-15',
      endDate: '2026-06-30',
    },
  ], {
    ignoreDuplicates: true,
  });

  const cohort = cohorts[0];

  await Participant.bulkCreate([
    {
      userId: users[0].id,
      cohortId: cohort.id,
      status: 'active',
      joinedAt: new Date(),
    },
    {
      userId: users[1].id,
      cohortId: cohort.id,
      status: 'active',
      joinedAt: new Date(),
    },
  ], {
    ignoreDuplicates: true,
  });

  await Contribution.bulkCreate([
    {
      userId: users[0].id,
      cohortId: cohort.id,
      projectContext: 'Hall Of Bootcamp',
      type: 'feature',
      description: 'Designed the landing page mockup and basic layout structure.',
    },
    {
      userId: users[1].id,
      cohortId: cohort.id,
      projectContext: 'Hall Of Bootcamp',
      type: 'backend',
      description: 'Built the initial REST API structure and Sequelize model setup.',
    },
  ], {
    ignoreDuplicates: true,
  });
}

module.exports = seedBootcampData;
