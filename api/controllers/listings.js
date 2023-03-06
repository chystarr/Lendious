const express = require("express");
const router = express.Router();
const db = require("../models");
const { Listing } = db;

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

module.exports = router;