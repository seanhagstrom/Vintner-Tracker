const client = require('./client');

async function createType({ type }) {
  try {
    const {
      rows: [alcoholType],
    } = await client.query(
      `
      INSERT INTO types(type)
      VALUES ($1)
      RETURNING *;
    `,
      [type]
    );
    return alcoholType;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createType,
};
