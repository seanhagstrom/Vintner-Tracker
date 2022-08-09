const client = require('./client');

async function createBatch({ vintnerId, start_date, initial_sg }) {
  try {
    const {
      rows: [batch],
    } = await client.query(
      `
      INSERT INTO batches("vintnerId", start_date, initial_sg)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [vintnerId, start_date, initial_sg]
    );
    return batch;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBatch,
};
