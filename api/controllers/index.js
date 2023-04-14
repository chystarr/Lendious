const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");
const buildingsController = require("./buildings.js");
const listingsController = require("./listings.js");
const itemTypesController = require("./itemTypes.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/auth", authController);
router.use("/buildings", buildingsController);
router.use("/listings", listingsController);
router.use("/item-types", itemTypesController);

module.exports = router;