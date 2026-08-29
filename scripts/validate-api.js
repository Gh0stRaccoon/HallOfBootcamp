const app = require('../app');
const sequelize = require('../src/config/database');

function check(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function formatPayload(prefix) {
  const stamp = Date.now();
  return {
    name: `${prefix} User ${stamp}`,
    email: `${prefix.toLowerCase()}_${stamp}@example.com`,
    role: 'Developer',
    bio: 'Validated through automated API checks.',
    avatarUrl: `https://example.com/${prefix.toLowerCase()}-${stamp}.png`,
    linkedInUrl: `https://linkedin.com/in/${prefix.toLowerCase()}-${stamp}`,
    githubUrl: `https://github.com/${prefix.toLowerCase()}-${stamp}`,
  };
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
    await sequelize.sync({ force: false });

    server = app.listen(0, '127.0.0.1');
    await new Promise((resolve) => {
      server.once('listening', resolve);
    });

    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    const health = await request(baseUrl, '/health');
    check(health.status === 200 && health.data.status === 'ok', 'GET /health should return status ok');
    checks.push({ name: 'health', ok: true });

    const apiRoot = await request(baseUrl, '/api');
    check(apiRoot.status === 200 && apiRoot.data.message === 'Hall Of Bootcamp API', 'GET /api should return API message');
    checks.push({ name: 'api-root', ok: true });

    const usersInitial = await request(baseUrl, '/api/users');
    check(usersInitial.status === 200 && Array.isArray(usersInitial.data), 'GET /api/users should return an array of users');
    checks.push({ name: 'list-users', ok: true });

    const cohortPayload = {
      name: `Validation Cohort ${Date.now()}`,
      slug: `validation-cohort-${Date.now()}`,
      startDate: '2026-09-01T00:00:00.000Z',
      endDate: '2026-12-15T00:00:00.000Z',
    };

    const cohortCreate = await request(baseUrl, '/api/cohorts', {
      method: 'POST',
      body: JSON.stringify(cohortPayload),
    });
    check(cohortCreate.status === 201 && cohortCreate.data.id, 'POST /api/cohorts should create a cohort');
    checks.push({ name: 'create-cohort', ok: true });

    const userPayload = formatPayload('Validator');
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
    check(duplicateUser.status === 400, 'Duplicate user email should be rejected');
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
        projectContext: 'Hall Of Bootcamp Validation',
        type: 'feature',
        description: 'Validated API behavior with automated checks.',
      }),
    });
    check(contributionCreate.status === 201 && contributionCreate.data.id, 'POST /api/contributions should create a contribution');
    checks.push({ name: 'create-contribution', ok: true });

    const participantsList = await request(baseUrl, '/api/participants');
    check(participantsList.status === 200 && Array.isArray(participantsList.data), 'GET /api/participants should return a list');
    checks.push({ name: 'list-participants', ok: true });

    const contributionsList = await request(baseUrl, '/api/contributions');
    check(contributionsList.status === 200 && Array.isArray(contributionsList.data), 'GET /api/contributions should return a list');
    checks.push({ name: 'list-contributions', ok: true });

    console.log(JSON.stringify({
      ok: true,
      checks,
      summary: {
        total: checks.length,
        passed: checks.filter((checkItem) => checkItem.ok).length,
      },
    }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      ok: false,
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
