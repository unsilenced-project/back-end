const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbHelpers = require("../models/userHelper");
const Joi = require("joi");
const generateToken = require("../middleware/generateToken");

router.post(
  "/register",
  schemaValid(dbHelpers.userSchema),
  async (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 12);

    try {
      const result = await dbHelpers.registerUser(creds);
      res.status(responseStatus.successful).json({
        id: result.id,
        email: result.email,
        username: result.username,
        role: result.role_id,
        message: `User: ${result.username} was registered succesfully`
      });
    } catch (error) {
      next(responseStatus.serverError);
    }
  }
);
