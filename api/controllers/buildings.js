const express = require("express");
const router = express.Router();
const db = require("../models");
const { Building, User } = db;

// Routes
// 
// GET /api/buildings
// Get list of all buildings
//
// GET /api/buildings/:id/residents
// Get list of all residents of a certain building
//
// POST /api/buildings
// Add a new building
//
// POST /api/buildings/:id/join
// Allows user to join the group for a certain building

router.get("/", (req, res) => {
  Building.findAll({}).then((allBuildings) => res.json(allBuildings));
});

router.get("/:id/residents", async (req, res) => {
  const { id } = req.params;
  const buildingWithId = await Building.findByPk(id);
  if (!buildingWithId) {
    return res.sendStatus(404);
  }
  Building.findByPk(id, { include: User }).then(buildingInfo => res.json(buildingInfo.Users));
});

router.post("/", (req, res) => {
  const { name } = req.body;
  Building.create({ name })
    .then((newBuilding) => {
      res.status(201).json(newBuilding);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/:id/join", async (req, res) => {
  const { id } = req.params;
  const userId = 1; // using 1 as a placeholder for req.user.id until user auth is added
  const buildingWithId = await Building.findByPk(id);
  if (!buildingWithId) {
    return res.sendStatus(404);
  }
  const userWithId = await User.findByPk(userId);
  if (!userWithId) {
    return res.sendStatus(404);
  }

  buildingWithId.addUser(userWithId)
  .then((joinInfo) => {
    res.status(201).json(joinInfo);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;