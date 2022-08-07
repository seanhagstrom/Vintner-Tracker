const client = require('./client');
const { createUser, createBatch } = require('./index');

async function dropTables() {
  console.log('Starting to drop tables...');

  await client.query(`
  DROP TABLE IF EXISTS batch_ingredients;
  DROP TABLE IF EXISTS batch_type;
  DROP TABLE IF EXISTS ingredients;
  DROP TABLE IF EXISTS type;
  DROP TABLE IF EXISTS batch;
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

  CREATE TABLE batch (
    id SERIAL PRIMARY KEY,
    "vintnerId" INTEGER REFERENCES users(id),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    initial_sg DECIMAL DEFAULT 0.0,
    final_sg DECIMAL DEFAULT 0.0,
    bottle_date DATE,
    abv DECIMAL,
    bottles_produced INTEGER
  );

  CREATE TABLE type (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE batch_ingredients (
    id SERIAL PRIMARY KEY,
    "batchId" INTEGER REFERENCES batch(id),
    "ingredientId" INTEGER REFERENCES ingredients(id),
    qty INTEGER,
    brand VARCHAR(255),
    UNIQUE ("batchId", "ingredientId")
  );

  CREATE TABLE batch_type (
    id SERIAL PRIMARY KEY,
    "batchId" INTEGER REFERENCES batch(id),
    "typeId" INTEGER REFERENCES type(id),
    UNIQUE ("batchId", "typeId")
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

async function createInitialBatches() {
  console.log('Starting to create batches...');
  try {
    const batchesToCreate = [
      { vintnerId: 1, start_date: '2022-06-25', initial_sg: 1.09 },
      { vintnerId: 1, start_date: '2022-08-03', initial_sg: 1.1 },
    ];
    const batches = await Promise.all(batchesToCreate.map(createBatch));

    console.log('Batches created:');
    console.log(batches);
    console.log('Finished creating batches!');
  } catch (error) {
    console.error('Error creating batches!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBatches();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
