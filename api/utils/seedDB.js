/*==================================================
/utils/seedDB.js

It seeds the database with several buildings and the set amount of item types.
==================================================*/
//const { Building } = require('../models/Building');  // Import Building model
//const { ItemType } = require('../models/ItemType');    // Import ItemType model

//seeding the db only work when import is written in this format
const {Building, ItemType, User} = require("../models");

// Seed database
const seedDB = async () => {
	// Create dummy user
	const dan = await User.create({
		user_id:1,
		name: "Dan",
		email: "dan@gmail.com",
		password: "test123"
	})


	// Create a new building
	const dummy_building = await Building.create({
        building_id: 1,
		name: "740 Park Avenue"
	});
	// Create a new building
	const dummy_building2 = await Building.create({
        building_id: 2,
		name: "834 Fifth Avenue"
	});
	// Create a new building
	const dummy_building3 = await Building.create({
        building_id: 3,
		name: "170 Amsterdam Apartments"
	});
	
	// Create itemtype
	const type_1 = await ItemType.create({
		itemType_id: 1,
        type:"Hardware/Tool"
	});
	// Create itemtype
	const type_2 = await ItemType.create({
		itemType_id: 2,
        type:"Game"
	});
    // Create itemtype
	const type_3 = await ItemType.create({
		itemType_id: 3,
        type:"Book"
	});

	// Add students to campuses
	//await dummy_student.setCampus(dummy_campus);
	//await dummy_student2.setCampus(dummy_campus2);
}

// Export the database seeding function
module.exports = seedDB;