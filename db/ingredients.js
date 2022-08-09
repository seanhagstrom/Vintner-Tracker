const client = require('./client');

async function createIngredient({ ingredient }) {
  try {
    const {
      rows: [ingredientName],
    } = await client.query(
      `
      INSERT INTO ingredients(ingredient)
      VALUES ($1)
      RETURNING *;
    `,
      [ingredient]
    );
    return ingredientName;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createIngredient,
};
