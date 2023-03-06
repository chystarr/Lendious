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
// POST /api/listing
// Add a new listing as the lender
//
// PATCH /api/listing/borrow
// Borrow a listing

router.get("/", (req, res) => {
  Listing.findAll({}).then((allListings) => res.json(allListings));
});

/*
router.get("/item-type/:id", async (req, res) => {
  const { id } = req.params;
  const typeWithId = await ItemType.findByPk(id);
  if (!typeWithId) {
    return res.sendStatus(404);
  }
});
*/

// maybe modify this so that building_id doesn't have to be a param in the body
// only allow user to do this if she's already a member of the building?
router.post("/", (req, res) => {
  const { name, compensation, range_start, range_end, condition, item_description, building_id, item_type_id } = req.body;
  const lender_id = 1; // placeholder until user auth is added
  Listing.create({ name, compensation, range_start, range_end, condition, item_description, building_id, lender_id, item_type_id })
  .then((newListing) => {
    res.status(201).json(newListing);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;