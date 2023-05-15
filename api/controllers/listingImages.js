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

router.post("/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await listingWithId.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  
  const { listing_image_id, image } = req.body;
  ListingImage.create({ listing_image_id, image, id })
  .then((newListingImage) => {
    res.status(201).json(newListingImage);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});
module.exports = router;