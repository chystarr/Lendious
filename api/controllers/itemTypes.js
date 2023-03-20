const express = require("express");
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

router.get("/", (req, res) => {
  ItemType.findAll({}).then((allItemTypes) => res.json(allItemTypes));
});

router.post("/", (req, res) => {
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