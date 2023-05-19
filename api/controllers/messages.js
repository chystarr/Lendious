const express = require("express");
const passport = require("../middlewares/authentication");
const router = express.Router();
const db = require("../models");
const { Message, Listing } = db;

// Routes
// 
// GET /api/messages/:id
// Get all messages for a certain chatroom (tied to the listing id associated with
// both the message and the chatroom)
//
// POST /api/messages
// Add a new message
//
// DELETE /api/messages/listing/:id
// Delete all messages associated with a certain listing

router.get("/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  Message.findAll({where: {listing_id: id}}).then(messagesAboutListing => res.json(messagesAboutListing));
});

router.post("/", passport.isAuthenticated(), (req, res) => {
  // the current date will be used as the default date_sent value upon creation of a new entry in the Messages table
  const { message_content, listing_id } = req.body;
  const sender_id = req.user.user_id;
  Message.create({ sender_id, message_content, listing_id })
  .then((newMessage) => {
    res.status(201).json(newMessage);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete("/listing/:id", passport.isAuthenticated(), async (req, res) => {
  const { id } = req.params;
  const listingWithId = await Listing.findByPk(id);
  if (!listingWithId) {
    return res.sendStatus(404);
  }
  Message.findAll({where: {listing_id: id}}).then(messagesAboutListing => messagesAboutListing.forEach(messageAboutListing => {
    messageAboutListing.destroy();
  }));
  res.sendStatus(204);
});

module.exports = router;