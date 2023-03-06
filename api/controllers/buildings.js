const express = require("express");
const router = express.Router();
const db = require("../models");
const { Building } = db;

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