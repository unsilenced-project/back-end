exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username", 200)
      .notNullable()
      .unique();
    table
      .string("email", 200)
      .notNullable()
      .unique();
    table.string("password", 200).notNullable();
    table.string("channel_link", 254).notNullable();
    table.string("channel_name", 255);
    table.string("social_links", 500);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
