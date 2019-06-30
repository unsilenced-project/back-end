const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbHelpers = require("../models/user_model");
const Joi = require("joi");
const generateToken = require("../middleware/generateToken");

router.post(
  "/register",
  schemaValid(dbHelpers.userSchema),
  async (req, res) => {
    const creds = req.body;

    let [existingUser] = await dbHelpers.filter({ username: creds.username });
    if (existingUser)
      return res.status(405).json({
        message: "That username has already been taken."
      });

    let [existingUser] = await dbHelpers.filter({ username: creds.email });
    if (existingUser)
      return res.status(405).json({
        message: "That email has already been taken."
      });

    creds.password = bcrypt.hashSync(creds.password, 12);

    try {
      const result = await dbHelpers.registerUser(creds);
      res.status(200).json({
        message: `User: ${result.username} was registered succesfully`,
        id: result.id,
        email: result.email,
        username: result.username,
        role: result.role_id,
        channelLink: username.channel_link,
        channelName: username.channel_name,
        socialLinks: username.socialLinks
      });
    } catch (error) {
      next(500).json({
        error: "Server ERROR : unable to register the User"
      });
    }
  }
);

module.exports = router;
