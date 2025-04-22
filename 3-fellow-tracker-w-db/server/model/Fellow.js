// const getId = require('../utils/getId');
const knex = require('./knex');
// Restrict access to our mock "database" to just the Model
// const fellows = [
//   { name: 'Carmen', id: getId() },
//   { name: 'Reuben', id: getId() },
//   { name: 'Maya', id: getId() },
// ];

class Fellow {
  // Create and add the new fellow to the "database" (the fellows array)
  // Rather than using a constructor, we use a static method to create a new fellow
  static async create(name) {
    // const newFellow = {
    //   name,
    //   id: getId()
    // }
    // fellows.push(newFellow);
    // return newFellow;
    const query = `
      INSERT INTO fellows (name)
      values (?)
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [name])
    return rows;
  }

  // Get all values from the "database"
  static async list() {
    // return [...fellows];
    const query = `
    SELECT * FROM fellows
    `
    const {rows} = await knex.raw(query);
  return rows;
  }

  // Get one value from the "database"
  static async find(id) {
    // return fellows.find((fellow) => fellow.id === id);
    const query = `
    SELECT * 
    FROM fellows
    WHERE id = ? 
    `
    const { rows } = await knex.raw(query, [id]);
    console.log(rows)
    return rows[0]
  }

  // Update one value from the "database"
  static async editName(id, newName) {
    // const fellow = Fellow.find(id);
    // if (!fellow) return null;
    // fellow.name = newName;
    // return fellow;
    const query = `
    UPDATE fellows 
    SET name = ?
    WHERE id = ?
    RETURNING *
  `
    const { rows } = await knex.raw(query, [newName, id])
    return rows[0];

  }

  // Delete one value from the "database"
  static async delete(id) {
    // const fellowIndex = fellows.findIndex((fellow) => fellow.id === id);
    // if (fellowIndex < 0) return false;

    // fellows.splice(fellowIndex, 1);
    // return true;
    const query = `
      DELETE 
      FROM fellows
      WHERE id = ?
    `
    const { rows } = await knex.raw(query, [id]);
    return rows
  }
}

module.exports = Fellow;

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Fellow.js`:

console.log(Fellow.list())
console.log(Fellow.find(1))
console.log(Fellow.editName(1, 'ZO!!'))
console.log(Fellow.delete(2))
console.log(Fellow.list())
*/
