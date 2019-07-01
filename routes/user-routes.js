const router = require("express").Router();
const restricted = require("../middleware/restricted");
const dbHelpers = require("../models/user_model");
const sgMail = require("@sendgrid/mail"); //sendgrid library to send emails
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jwt = require("jsonwebtoken");
import uuid from "uuid";

router.get("/users", restricted, async (req, res, next) => {
  try {
    const users = await dbHelpers.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    next(500).json({ message: "" });
  }
});

router.get("/users/:id", restricted, async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await dbHelpers.getUserbyId(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `The specified ID not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get a user by Id" });
  }
});

router.delete("/users/:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbHelpers.remove(id);
    if (result === 1) {
      res.status(200).json({
        message: "User was delete Succesfully"
      });
    } else {
      res.status(404).json({ message: "User was not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was a error trying to delete the user" });
  }
});

router.put("/users/:id", restricted, async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const result = await dbHelpers.update(id, user);
    if (result === 1) {
      res.status(200).json({
        updateID: id,
        message: `User: ${user.username} Update succesfully`
      });
    } else {
      res.status(404).json({ message: "User was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to update a user" });
  }
});

router.post("/send-email", restricted, async (req, res) => {
  const creds = req.body;
  let [existingUser] = await dbHelpers.filter({ email: creds.email });
  if (!existingUser)
    return res.status(405).json({
      message: "This email doesn't exist, please register"
    });

  existingUser.password = uuid();

  console.log(existingUser);

  try {
    const result = await dbHelpers.update(existingUser.id, existingUser);
    // console.log(req.decodedToken.password);
  } catch (error) {
    res.status({ error: "there was a error trying to send the email" });
  }
});

module.exports = router;
