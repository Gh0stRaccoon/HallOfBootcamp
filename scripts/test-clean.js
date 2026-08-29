const app = require('../app');
const sequelize = require('../src/config/database');
const seedBootcampData = require('../src/database/seeders/001_seed_bootcamp_data.js');

function check(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function request(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
  }

  return {
    status: response.status,
    data,
  };
}

async function main() {
  let server;
  const checks = [];

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await seedBootcampData();

    const { User, Cohort, Participant, Contribution } = require('../src/models');
    const counts = {
      users: await User.count(),
      cohorts: await Cohort.count(),
      participants: await Participant.count(),
      contributions: await Contribution.count(),
    };

    check(counts.users === 2, 'Clean reset should seed exactly 2 users');
    check(counts.cohorts === 1, 'Clean reset should seed exactly 1 cohort');
    check(counts.participants === 2, 'Clean reset should seed exactly 2 participants');
    check(counts.contributions === 2, 'Clean reset should seed exactly 2 contributions');
    checks.push({ name: 'seed-reset', ok: true, counts });

    server = app.listen(0, '127.0.0.1');
    await new Promise((resolve) => {
      server.once('listening', resolve);
    });

    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    const health = await request(baseUrl, '/health');
    check(health.status === 200 && health.data.status === 'ok', 'GET /health should return status ok');
    checks.push({ name: 'health', ok: true });

    const usersList = await request(baseUrl, '/api/users');
    check(usersList.status === 200 && Array.isArray(usersList.data), 'GET /api/users should return an array');
    checks.push({ name: 'list-users', ok: true });

    const cohortPayload = {
      name: `Clean Test Cohort ${Date.now()}`,
      slug: `clean-test-${Date.now()}`,
      startDate: '2026-09-01T00:00:00.000Z',
      endDate: '2026-12-15T00:00:00.000Z',
    };

    const cohortCreate = await request(baseUrl, '/api/cohorts', {
      method: 'POST',
      body: JSON.stringify(cohortPayload),
    });
    check(cohortCreate.status === 201 && cohortCreate.data.id, 'POST /api/cohorts should create a cohort');
    checks.push({ name: 'create-cohort', ok: true });

    const userPayload = {
      name: `Clean Tester ${Date.now()}`,
      email: `clean_${Date.now()}@example.com`,
      role: 'Developer',
      bio: 'Validated through a clean test cycle.',
      avatarUrl: `https://example.com/avatar-${Date.now()}.png`,
      linkedInUrl: `https://linkedin.com/in/clean-${Date.now()}`,
      githubUrl: `https://github.com/clean-${Date.now()}`,
    };

    const userCreate = await request(baseUrl, '/api/users', {
      method: 'POST',
      body: JSON.stringify(userPayload),
    });
    check(userCreate.status === 201 && userCreate.data.id, 'POST /api/users should create a user');
    checks.push({ name: 'create-user', ok: true });

    const duplicateUser = await request(baseUrl, '/api/users', {
      method: 'POST',
      body: JSON.stringify({ ...userPayload, email: userPayload.email }),
    });
    check(duplicateUser.status === 400, 'Duplicate user email should be rejected during clean tests');
    checks.push({ name: 'duplicate-user-rejected', ok: true });

    const participantCreate = await request(baseUrl, '/api/participants', {
      method: 'POST',
      body: JSON.stringify({
        userId: userCreate.data.id,
        cohortId: cohortCreate.data.id,
        status: 'active',
        joinedAt: new Date().toISOString(),
      }),
    });
    check(participantCreate.status === 201 && participantCreate.data.id, 'POST /api/participants should create a participant');
    checks.push({ name: 'create-participant', ok: true });

    const contributionCreate = await request(baseUrl, '/api/contributions', {
      method: 'POST',
      body: JSON.stringify({
        userId: userCreate.data.id,
        cohortId: cohortCreate.data.id,
        projectContext: 'Clean test validation',
        type: 'feature',
        description: 'Automated validation for a clean database cycle.',
      }),
    });
    check(contributionCreate.status === 201 && contributionCreate.data.id, 'POST /api/contributions should create a contribution');
    checks.push({ name: 'create-contribution', ok: true });

    console.log(JSON.stringify({
      ok: true,
      cleanTest: true,
      checks,
      summary: {
        total: checks.length,
        passed: checks.filter((item) => item.ok).length,
      },
    }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      ok: false,
      cleanTest: true,
      error: error.message,
      stack: error.stack,
    }, null, 2));
    process.exitCode = 1;
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await sequelize.close();
  }
}

main();
