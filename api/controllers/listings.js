const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Listing, ItemType, ListingImage } = db;

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
// GET /api/listings/my-listings
// Get all the users listings
//
// GET /api/listings/borrowing
// Get all listings where the user is the one borrowing them
//
// GET /api/listings/:id
// Get the data about a certain listing
//
// POST /api/listings
// Add a new listing as the lender
//
// PATCH /api/listings/:id/borrow
// Borrow a listing
//
// PATCH /api/listings/:id/edit
// Edit a listing
//
// DELETE /api/listings/:id
// Delete a listing

router.get("/", passport.isAuthenticated(), (req, res) => {
  Listing.findAll({}).then((allListings) => res.json(allListings));
});

router.get("/item-type/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const typeWithId = await ItemType.findByPk(id);
  if (!typeWithId) {
    return res.sendStatus(404);
  }
  Listing.findAll({where: {item_type_id: id}}).then(listingsWithType => res.json(listingsWithType));
});

router.get("/my-listings", passport.isAuthenticated(), async (req,res) => {
  //take the passed in user_id
  const id = req.user.user_id;
  //find all listings where listings lender_id === passed in user_id
  Listing.findAll({where: {lender_id: id}}).then((allUserListings) => {
    res.json(allUserListings)
  });
})

router.get("/borrowing", passport.isAuthenticated(), async (req,res) => {
  //take the passed in user_id
  const id = req.user.user_id;
  //find all listings where listings borrower_id === passed in user_id
  Listing.findAll({where: {borrower_id: id}}).then((allUserListings) => {
    res.json(allUserListings)
  });
})
/*
router.get("/:id", passport.isAuthenticated(), async (req,res) => {
  //take the passed in user_id
  const {id} = req.params;
  //find all listings where listings borrower_id === passed in user_id
  Listing.findByPk(id).then((allUserListings) => {
    res.json(allUserListings)
  });
})
*/

// maybe modify this so that building_id has to be a param in the body
router.post("/", passport.isAuthenticated(), (req, res) => {
  //const {b_id} = req.params;
  const { listing_id, name, compensation, range_start, range_end, condition, item_description, building_id, item_type_id} = req.body;

  const lender_id = req.user.user_id;
  const borrower_id = null;
  Listing.create({ listing_id, name, compensation, range_start, range_end, condition, item_description, building_id, lender_id, borrower_id, item_type_id })
  .then((newListing) => {
    res.status(201).json(newListing);
    // than create a listingImage entry
    //ListingImage.create({ listing_image_id, image, listing_id })
    //.then((newListingImage) => {
      //res.status(201).json(newListing, newListingImage);
    //})
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
});

module.exports = router;