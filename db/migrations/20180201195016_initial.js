exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', table => {
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.string('author');
      table.integer('#_of_comments');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('comments', table => {
      table.increments('id').primary();
      table.string('author');
      table.string('body');
      table.integer('post_id').unsigned();
      table.foreign('post_id').references('posts.id').onDelete('cascade');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('posts')
  ])
};
