const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { ListingImage, Listing } = db;

// Routes
// 
// GET /api/listingImages/:id
// Get the image for a certain listing
//
// POST /api/listingImages/:id
// Add a new image for a certain listing
//
// PATCH /api/listingsImages/:id
// Update an image for a certain listing
//
// DELETE /api/listingImages/:id
// Delete the image for a certain listing

router.get("/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await listingWithId.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  ListingImage.findOne({where: {listing_id: id}}).then(imageForListing => res.json(imageForListing));
});
/*
router.post("/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await listingWithId.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  
  const { image } = req.body;
  ListingImage.create({ listing_id, name, compensation, range_start, range_end, condition, item_description, building_id, lender_id, borrower_id, item_type_id })
  .then((newListingImage) => {
    res.status(201).json(newListingImage);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.patch("/:id/borrow", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  // check if the item is already being borrowed or the user is the lender of the item
  if (listingWithId.borrower_id || (req.user.user_id === listingWithId.lender_id)) {
    return res.sendStatus(409);
  }

  listingWithId.borrower_id = req.user.user_id;
  listingWithId.save().then(updatedListing => {
    res.json(updatedListing);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.patch("/:id/edit", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  // check if the item is already being borrowed
  if (listingWithId.borrower_id) {
    return res.sendStatus(409);
  }

  //name, compensation, range_start, range_end, condition, item_description, item_type_id
  listingWithId.name = req.body.name;
  listingWithId.compensation = req.body.compensation;
  listingWithId.range_start = req.body.range_start;
  listingWithId.range_end = req.body.range_end;
  listingWithId.condition = req.body.condition;
  listingWithId.item_description = req.body.item_description;
  listingWithId.item_type_id = req.body.item_type_id;

  listingWithId.save().then(updatedListing => {
    res.json(updatedListing);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.delete("/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  // check if the item is already being borrowed
  if (listingWithId.borrower_id) {
    return res.sendStatus(409);
  }

  listingWithId.destroy();
  res.sendStatus(204);
});

router.get("/size", (req,res) => {
  console.log("inside the size route");
  Listing.findAll({}).then((allPosts) => {
    res.json(allPosts.length)
  });
}) 
*/
module.exports = router;