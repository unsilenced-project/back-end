const db = require("../database/dbConfig");
const Joi = require("joi");

const userSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .min(2),
  channel_link: Joi.string(),
  channel_name: Joi.string(),
  social_links: Joi.string()
});

const getUserbyId = async id => {
  const query = await db("users")
    .where({ id })
    .first();
  return query;
};

const getAllUsers = async () => {
  return await db("users");
};

const registerUser = async user => {
  const [id] = await db("users").insert(user);
  const query = await db("users")
    .where({ id })
    .first();
  return query;
};

const filter = async query => {
  return await db("users").where(query);
};

const remove = async id => {
  return await db("users")
    .where({ id })
    .del();
};

const update = async (id, changes) => {
  return await db("users")
    .where({ id })
    .update(changes);
};

module.exports = {
  userSchema,
  getUserbyId,
  getAllUsers,
  filter,
  registerUser,
  remove,
  update
};
