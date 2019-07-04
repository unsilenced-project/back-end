const router = require("express").Router();
const restricted = require("../middleware/restricted");
const dbHelpers = require("../models/user_model");
const sgMail = require("@sendgrid/mail"); //sendgrid library to send emails
var randomstring = require("randomstring");
const bcrypt = require("bcryptjs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  // update password if provided
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 12);
  }
  try {
    const result = await dbHelpers.update(id, user);
    if (result === 1) {
      res.status(200).json({
        updateID: id,
        message: `Update succesfully`
      });
    } else {
      res.status(404).json({ message: "User was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to update a user" });
  }
});

router.post("/send-email", async (req, res) => {
  const creds = req.body;
  let [existingUser] = await dbHelpers.filter({ email: creds.email });
  if (!existingUser)
    return res.status(405).json({
      message: "This email doesn't exist, please register"
    });

  existingUser.password = randomstring.generate(7);

  if (existingUser) {
    try {
      const msg = {
        to: existingUser.email,
        from: "sorin.chis06@gmail.com",
        subject: "Hello From Unsilenced, This is your new password",
        text: `${
          existingUser.password
        } is your new password we recomand you to change it from the settings`
      };

      //Send Email
      sgMail.send(msg).then(msg => {
        console.log(msg);
        res.end();
      });
      const result = await dbHelpers.update(existingUser.id, existingUser);
      // console.log(req.decodedToken.password);
      if (result) {
        res.status(200).json({
          message:
            "Password was changed and email was succesfullt sent to the user"
        });
      }
    } catch (error) {
      res.status({ error: "there was a error trying to send the email" });
    }
  }

  console.log(existingUser);
});

module.exports = router;
