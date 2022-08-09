const client = require('./client');
const {
  createUser,
  createBatch,
  createType,
  createIngredient,
} = require('./index');

async function dropTables() {
  console.log('Starting to drop tables...');

  await client.query(`
  DROP TABLE IF EXISTS batch_ingredients;
  DROP TABLE IF EXISTS batch_types;
  DROP TABLE IF EXISTS ingredients;
  DROP TABLE IF EXISTS types;
  DROP TABLE IF EXISTS batches;
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

  CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    "vintnerId" INTEGER REFERENCES users(id),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    initial_sg DECIMAL DEFAULT 0.0,
    final_sg DECIMAL DEFAULT 0.0,
    bottle_date DATE,
    abv DECIMAL,
    bottles_produced INTEGER
  );

  CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE batch_ingredients (
    id SERIAL PRIMARY KEY,
    "batchId" INTEGER REFERENCES batches(id),
    "ingredientId" INTEGER REFERENCES ingredients(id),
    qty INTEGER,
    brand VARCHAR(255),
    UNIQUE ("batchId", "ingredientId")
  );

  CREATE TABLE batch_types (
    id SERIAL PRIMARY KEY,
    "batchId" INTEGER REFERENCES batches(id),
    "typeId" INTEGER REFERENCES types(id),
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

async function createInitialTypes() {
  console.log('Starting to create types...');
  try {
    const typesToCreate = [
      { type: 'Merlot' },
      { type: 'Sauvignon Blanc' },
      { type: 'Cabernet Sauvignon' },
      { type: 'Rose Wine' },
      { type: 'Malbec' },
      { type: 'Monastrell' },
      { type: 'Pinot Grigio' },
      { type: 'Chardonay' },
      { type: 'Reisling' },
      { type: 'Pinot Noir' },
      { type: 'Prosecco' },
      { type: 'Champagne' },
      { type: 'Chianti' },
      { type: 'Bordeaux' },
      { type: 'Petite Sirah' },
      { type: 'Syrah' },
      { type: 'Tempranillo' },
      { type: 'Grenache' },
    ];
    const types = await Promise.all(typesToCreate.map(createType));

    console.log('Types created:');
    console.log(types);
    console.log('Finished creating types!');
  } catch (error) {
    console.error('Error creating types!');
    throw error;
  }
}

async function createInitialIngriedents() {
  console.log('Starting to create ingredients...');
  try {
    const ingredientsToCreate = [
      { ingredient: 'Water' },
      { ingredient: 'Grape Juice' },
      { ingredient: 'Grape Skins' },
      { ingredient: 'Eye of Newt' }, //LOL maybe this should't be in wine!?!?
    ];
    const ingredients = await Promise.all(
      ingredientsToCreate.map(createIngredient)
    );

    console.log('Ingredients created:');
    console.log(ingredients);
    console.log('Finished creating ingredients!');
  } catch (error) {
    console.error('Error creating ingredients!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBatches();
    await createInitialTypes();
    await createInitialIngriedents();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
