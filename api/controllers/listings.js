const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Listing, Building, ItemType } = db;

// Routes
// 
// GET /api/listings
// Get all listings
//
// GET /api/listings/building/:id
// Get all listings from a certain building
//
// GET /api/listings/item-type/:id
// Get all listings of a certain type
//
// POST /api/listings
// Add a new listing as the lender
//
// PATCH /api/listings/:id/borrow
// Borrow a listing

router.get("/", passport.isAuthenticated(), (req, res) => {
  Listing.findAll({}).then((allListings) => res.json(allListings));
});

/* router.get("/building/:id", passport.isAuthenticated(), async (req, res) => {
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
}); */

// should be from a certain building in addition to being of a certain type?
router.get("/item-type/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const typeWithId = await ItemType.findByPk(id);
  if (!typeWithId) {
    return res.sendStatus(404);
  }
  Listing.findAll({where: {item_type_id: id}}).then(listingsWithType => res.json(listingsWithType));
});

// maybe modify this so that building_id has to be a param in the body
router.post("/", passport.isAuthenticated(), (req, res) => {
  //const {b_id} = req.params;
  const { name, compensation, range_start, range_end, condition, item_description, building_id, item_type_id } = req.body;
  const lender_id = req.user.user_id;
  const borrower_id = null;
  Listing.create({ name, compensation, range_start, range_end, condition, item_description, building_id, lender_id, borrower_id, item_type_id })
  .then((newListing) => {
    res.status(201).json(newListing);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.patch("/:id/borrow", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.status(404);    
  }
  listingWithId.borrower_id = req.user.user_id;
  listingWithId.save().then(updatedListing => {
    res.json(updatedListing);
  }).catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;