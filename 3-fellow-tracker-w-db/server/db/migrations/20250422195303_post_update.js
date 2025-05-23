/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('posts', function (table) {
    table.dropColumn('content');
    table.string('post_content');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.alterTable('posts', function (table) {
    table.dropColumn('post_content');
    table.string('content');
  });
};
