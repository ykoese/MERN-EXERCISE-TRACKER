
const express = require("express");

const router = express.Router();

let User = require('../models/user.model');



router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/add", async (req, res) => {

  const username = new User({
    username: req.body.username,

  });
  try {
    const savedUser = await username.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;