const client = require('../../db/client');
const { sum, createUser } = require('../../db');
const { dropTables, createTables } = require('../../db/seedData');

beforeAll(async () => {
  await dropTables();
  await createTables();
});

afterAll(async () => {
  await client.end();
  console.log('closed database');
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('createUser({username, password, email}', () => {
  test('Creates and returns the user', async () => {
    const userData = {
      username: 'Sean',
      password: 'not a great password',
      email: 'couldbebetter@what.com',
    };

    const user = await createUser(userData);
    expect(user.username).toBe(userData.username);
  });
});
