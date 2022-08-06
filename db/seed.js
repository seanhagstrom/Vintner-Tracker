const client = require('./client');

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
    password VARCHAR(255) NOT NULL
  );
  `);

  console.log('Finished building tables!');
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.log('Error during buildDB');
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
