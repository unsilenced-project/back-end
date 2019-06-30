const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "mark@test.com",
          username: "Alex",
          password: bcrypt.hashSync("test123", 12),
          channel_link:
            "https://www.youtube.com/channel/UCaziuyHLR37c2jBkHrYSQMA",
          channel_name: "best music",
          social_links: "facebook tweeter"
        },
        {
          id: 2,
          email: "pavol@test.com",
          username: "Pavol",
          password: bcrypt.hashSync("test123", 12),
          channel_link:
            "https://www.youtube.com/channel/UCaziuyHLR37c2jBkHrYSQMA",
          channel_name: "best music",
          social_links: "facebook tweeter"
        },
        {
          id: 3,
          email: "delba@test.com",
          username: "Delva",
          password: bcrypt.hashSync("test123", 12),
          channel_link:
            "https://www.youtube.com/channel/UCsMiwFQdEP5t_5a7CpGN7tQ",
          channel_name: "sports for everyone",
          social_links: "facebook tweeter"
        },
        {
          id: 4,
          email: "Mat@test.com",
          username: "Mat",
          password: bcrypt.hashSync("test123", 12),
          channel_link:
            "https://www.youtube.com/channel/UCKBmwzjp-6eFAW0HYNMWJ5w",
          channel_name: "all about dance",
          social_links: "facebook tweeter"
        }
      ]);
    });
};
