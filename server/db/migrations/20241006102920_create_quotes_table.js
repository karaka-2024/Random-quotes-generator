/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  await knex.schema.createTable('quotes', (table) => {
    table.increments('id').primary();
    table.string('quote').notNullable();
    table.string('author').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  await knex.schema.dropTable('quotes')
};
