const client = require('./client');

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

async function buildDB() {
  try {
    await createTables();
  } catch (error) {
    console.log('Error during buildDB');
    throw error;
  }
}

buildDB()
  .catch(console.error)
  .finally(() => client.end());
