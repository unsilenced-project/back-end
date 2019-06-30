const router = require("express").Router();
const restricted = require("../middleware/restricted");
const dbHelpers = require("../models/user_model");

router.get("/users", async (req, res, next) => {
  try {
    const users = await dbHelpers.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    next(500).json({ message: "" });
  }
});

module.exports = router;
