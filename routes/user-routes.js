const router = require("express").Router();
const restricted = require("../middleware/restricted");
const dbHelpers = require("../models/user_model");

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

module.exports = router;
