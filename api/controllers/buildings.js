const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Building, User, Listing } = db;

// Routes
// 
// GET /api/buildings
// Get list of all buildings
//
// GET /api/buildings/my-building
// Get the building of the current user
//
// GET /api/buildings/:id
// Get all listings from a certain building
//
// GET /api/buildings/:id/residents
// Get list of all residents of a certain building
//
// POST /api/buildings
// Add a new building
//
// POST /api/buildings/:id/join
// Allows user to join the group for a certain building

router.get("/", passport.isAuthenticated(), (req, res) => {
  Building.findAll({}).then((allBuildings) => res.json(allBuildings));
});

router.get("/my-building", passport.isAuthenticated(), async (req, res) => {
  const userId = req.user.user_id;
  const userWithId = await User.findByPk(userId);
  if (!userWithId) {
    return res.sendStatus(404);
  }
  Building.findOne({include: {model: User, where: {user_id: userId}}}).then(buildingInfo => res.json(buildingInfo.building_id));
});

router.get("/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const buildingWithId = await Building.findByPk(id);
  if (!buildingWithId) {
    console.log("cant find building");
    return res.sendStatus(404);
  }
  Listing.findAll({where: {building_id: id}}).then(listingsFromBuilding => {
    if(!listingsFromBuilding)
    {
      console.log("inside empty findAll route")
      res.status(200).send({});
    }
    res.json(listingsFromBuilding)
  });
});


router.get("/:id/residents", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const buildingWithId = await Building.findByPk(id);
  if (!buildingWithId) {
    return res.sendStatus(404);
  }
  Building.findByPk(id, { include: User }).then(buildingInfo => res.json(buildingInfo.Users));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  const { building_id, name } = req.body;
  Building.create({ building_id, name })
    .then((newBuilding) => {
      res.status(201).json(newBuilding);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/:id/join", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const userId = req.user.user_id;
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