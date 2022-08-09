const client = require('./client');

async function createUser({ username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email) VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username
    `,
      [username, password, email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

function sum(a, b) {
  return a + b;
}

module.exports = {
  createUser,
  sum,
};
