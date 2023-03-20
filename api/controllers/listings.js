const express = require("express");
const router = express.Router();
const db = require("../models");
const { Listing, ItemType } = db;

// Routes
// 
// GET /api/listings
// Get all listings
//
// GET /api/listings/item-type/:id
// Get all listings of a certain type
//
// POST /api/listings
// Add a new listing as the lender
//
// PATCH /api/listings/:id/borrow
// Borrow a listing

router.get("/", (req, res) => {
  Listing.findAll({}).then((allListings) => res.json(allListings));
});

// should be from a certain building in addition to being of a certain type?
router.get("/item-type/:id", async (req, res) => {
  const { id } = req.params;
  const typeWithId = await ItemType.findByPk(id);
  if (!typeWithId) {
    return res.sendStatus(404);
  }
  Listing.findAll({where: {item_type_id: id}}).then(listingsWithType => res.json(listingsWithType));
});

// maybe modify this so that building_id has to be a param in the body
// only allow user to do this if she's already a member of the building?
router.post("/", (req, res) => {
  const { name, compensation, range_start, range_end, condition, item_description, building_id, item_type_id } = req.body;
  const lender_id = 1; // placeholder until user auth is added
  const borrower_id = 1; //placeholder
  Listing.create({ name, compensation, range_start, range_end, condition, item_description, building_id, lender_id, borrower_id, item_type_id })
  .then((newListing) => {
    res.status(201).json(newListing);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.patch("/:id/borrow", async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.status(404);    
  }
  listingWithId.borrower_id = 2; // using 2 as a placeholder for id of currently logged in user
  listingWithId.save().then(updatedListing => {
    res.json(updatedListing);
  }).catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;