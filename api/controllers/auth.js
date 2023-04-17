const router = require("express").Router();
const { User } = require("../models");
const passport = require("../middlewares/authentication");

router.post("/signup", (req, res) => {
  console.log("POST body: ", req.body);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    user_id: req.body.user_id
  })
    .then((user) => {
      user.password = undefined;
      req.login(user, () => res.status(201).json(user));
    })
    .catch((err) => {
      res.status(400).json({ msg: "Failed Signup", err });
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json(req.user);
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});

router.post("/logout", (req, res, next) => {
  // Logout is now async and has to finish before we can return a response
  //  passport version >= 0.6.0
  //  https://medium.com/passportjs/fixing-session-fixation-b2b68619c51d
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
});

router.get("/size", (req,res) => {
  console.log("inside the size route");
  User.findAll({}).then((allUsers) => {
    res.json(allUsers.length)
  });
}) 

module.exports = router;