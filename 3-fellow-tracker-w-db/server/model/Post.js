// const getId = require('../utils/getId');
const knex = require('./knex');
// Restrict access to our mock "database" to just the Model
// const fellows = [
//   { name: 'Carmen', id: getId() },
//   { name: 'Reuben', id: getId() },
//   { name: 'Maya', id: getId() },
// ];

class Post {
  // Create and add the new fellow to the "database" (the fellows array)
  // Rather than using a constructor, we use a static method to create a new fellow
  static async create(content, fellowId) {
    // const newFellow = {
    //   name,
    //   id: getId()
    // }
    // fellows.push(newFellow);
    // return newFellow;
    const query = `
      INSERT INTO posts (post_content, fellow_id)
      values (?, ?)
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [content, fellowId])
    return rows;
  }

  // Get all values from the "database"
  static async list() {
    // return [...fellows];
    const query = `
    SELECT * FROM posts
    `
    const {rows} = await knex.raw(query);
  return rows;
  }

  // Get one value from the "database"
  static async findById(id) {
    // return fellows.find((fellow) => fellow.id === id);
    const query = `
    SELECT *
    FROM posts
    WHERE id = ?
    `
    const { rows } = await knex.raw(query, [id]);
    console.log(rows)
    return rows[0]
  }

  static async findPostsByFellowId (fellowId){
    console.log('fellowId', fellowId)
    const query = `
    SELECT *
    FROM posts
    WHERE fellow_id = ?
    `
    const { rows } = await knex.raw(query, [fellowId]);
    return rows;
  }
  // Update one value from the "database"
  static async editPost(id, newContent) {
    // const fellow = Fellow.find(id);
    // if (!fellow) return null;
    // fellow.name = newName;
    // return fellow;
    const query = `
    UPDATE posts
    SET content = ?
    WHERE id = ?
    RETURNING *
  `
    const { rows } = await knex.raw(query, [newContent, id])
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
      FROM posts
      WHERE id = ?
    `
    const { rows } = await knex.raw(query, [id]);
    return rows
  }
  
  // Delete all posts by fellowId
  static async deleteByFellowId(fellowId) {
    const query = `
      DELETE 
      FROM posts
      WHERE fellow_id = ?
    `
    const { rows } = await knex.raw(query, [fellowId]);
    return rows;
}
}

module.exports = Post