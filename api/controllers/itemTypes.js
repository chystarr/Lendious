const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { ItemType } = db;

// Routes
// 
// GET /api/item-types
// Get list of all item types
//
// POST /api/item-types
// Add a new item type

router.get("/", passport.isAuthenticated(), (req, res) => {
  ItemType.findAll({}).then((allItemTypes) => res.json(allItemTypes));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  let { type } = req.body;
  ItemType.create({ type })
    .then((newType) => {
      res.status(201).json(newType);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;