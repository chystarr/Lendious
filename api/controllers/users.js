const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { User } = db;

// Routes
//
// GET /api/users/name
// Get the user's name
//
// GET /api/users/user/:id/name
// Get another user's name

router.get("/name", passport.isAuthenticated(), async (req, res) => {
  if (req.user) {
    res.json(req.user.name);
  } else {
    return res.sendStatus(404);
  }
});

router.get("/user/:id/name", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const userWithId = await User.findOne({where: {user_id: id}});
  if (!userWithId) {
    return res.sendStatus(404);
  }
  res.json(userWithId.name);
});

module.exports = router;