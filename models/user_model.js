const db = require("../database/dbConfig");
const Joi = require("joi");

const userSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  username: Joi.string()
    .min(1)
    .max(40)
    .required(),
  password: Joi.string()
    .required()
    .min(2),
  channel_link: Joi.string().required(),
  channel_name: Joi.string(),
  social_links: Joi.string()
});

module.exports = {
  userSchema
};
