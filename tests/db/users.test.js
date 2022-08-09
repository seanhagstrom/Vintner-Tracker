const client = require('../../db/client');
const { createUser, getUserByUsername } = require('../../db');
const { dropTables, createTables } = require('../../db/seedData');

beforeAll(async () => {
  await dropTables();
  await createTables();
});

afterAll(async () => {
  await client.end();
  console.log('closed database');
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

  test('returns the users id and username', async () => {
    const userData = {
      username: 'Brittany',
      password: 'not a great password',
      email: 'thedrama@whome.com',
    };

    const user = await createUser(userData);

    expect(user).toMatchObject({
      id: expect.any(Number),
      username: 'Brittany',
    });
    expect(user).not.toHaveProperty('password');
  });

  test('Does not return the password', async () => {
    const userData = {
      username: 'Ben',
      password: 'another not great password',
      email: 'drunkleben@thatsme.com',
    };

    const user = await createUser(userData);

    expect(user).not.toHaveProperty('password');
  });
});

describe('getUserByUsername(username)', () => {
  test('Returns the correct user', async () => {
    const user = await getUserByUsername('Sean');

    expect(user).toMatchObject({
      id: expect.any(Number),
      username: 'Sean',
      password: 'not a great password',
      email: 'couldbebetter@what.com',
    });
  });
});
