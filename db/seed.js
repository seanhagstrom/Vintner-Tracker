const client = require('./client');
const { createUser } = require('./users');

async function dropTables() {
  console.log('Starting to drop tables...');

  await client.query(`
  DROP TABLE IF EXISTS users;
  `);

  console.log('Tables successfully dropped!');
}

async function createTables() {
  console.log('Starting to build tables...');

  await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  );
  `);

  console.log('Finished building tables!');
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {
        username: 'bearWalker',
        password: "this isn't secure",
        email: 'brownbear@gmail.com',
      },
      {
        username: 'sean2morrow',
        password: 'his name is sean',
        email: 'gettinthatmoney@hellyeah.com',
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.log('Error during buildDB');
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
