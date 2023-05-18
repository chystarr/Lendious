/*==================================================
/utils/seedDB.js

It seeds the database with several buildings, users, listings, and requests.
==================================================*/


//seeding the db only work when import is written in this format
const {Building, ItemType, User, sequelize, Listing, Request, Message} = require("../models");

// Seed database
const seedDB = async () => {
	// Create dummy user
	const dan = await User.create({
		user_id:1,
		name: "Dan",
		email: "dan@gmail.com",
		password: "test123"
	})

	// Create dummy user 2
	const test = await User.create({
		user_id: 2,
		name: "test",
		email: "test@gmail.com",
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

	const BuildingMembership = sequelize.models.BuildingMembership;
	const association1 = await BuildingMembership.create({BuildingBuildingId: 3, UserUserId: 1 });
	const association2 = await BuildingMembership.create({BuildingBuildingId: 3, UserUserId: 2 });


	///// LISTINGS //////////////////////////////////////////////

	const l1 = await Listing.create({
		listing_id: 1,
		name:"The Game of Life",
		compensation:10,
		range_start:"04/17/23",
		range_end:"04/24/23",
		condition:"Acceptable",
		item_description:"A little wear and tear on the game board but all pieces and cards complete. Lending out for a week. This weekends game night is on me. Enjoy",
		building_id:3,
		lender_id:1,
		item_type_id:2
	})

	const l2 = await Listing.create({
		listing_id: 2,
		name:"Jenga",
		compensation:5,
		range_start:"04/21/23",
		range_end:"04/30/23",
		condition:"Acceptable",
		item_description:"Missing 3-4 pieces but the game is still playable.",
		building_id:3,
		lender_id:1,
		item_type_id:2,
		borrower_id: 2
	})

	const l3 = await Listing.create({
		listing_id: 3,
		name:"Uno",
		compensation:5,
		range_start:"04/22/23",
		range_end:"04/23/23",
		condition:"Acceptable",
		item_description:"Its Uno",
		building_id:3,
		lender_id:1,
		item_type_id:2
	})

	const l4 = await Listing.create({
		listing_id: 4,
		name:"5x Pine Plywood Panels",
		compensation:0,
		range_start:"04/22/23",
		range_end:"04/23/23",
		condition:"Like New",
		item_description:"Have some left over wood panels from a craft project I did over the weekend. Don't have any use for the remaing panels and looking to get them off my hands. Dont want em back. Keep em",
		building_id:3,
		lender_id:2,
		item_type_id:1
	})

	const l5 = await Listing.create({
		listing_id: 5,
		name:"Harry Potter and The Chamber of Secrets",
		compensation:10,
		range_start:"04/20/23",
		range_end:"04/30/23",
		condition:"Good",
		item_description:"The pages have yellowed a bit and have some scribbles and stray marks. Nothing to stop you from reading the book or makeout the words on the page",
		building_id:3,
		lender_id:2,
		item_type_id:3,
		borrower_id: 1
	})

	const l6 = await Listing.create({
		listing_id: 6,
		name:"Structure and Interpretation of Computer Programs, Second Ed.",
		compensation:0,
		range_start:"04/20/23",
		range_end:"04/30/23",
		condition:"Acceptable",
		item_description:"I got a newer edition and was looking to pass along this gem of a textbook. Interested in programming, hmu. Its yours for the taking. Don't want it back",
		building_id:3,
		lender_id:2,
		item_type_id:3
	})

	const l7 = await Listing.create({
		listing_id: 7,
		name:"Cordless Electric Handdrill",
		compensation:0,
		range_start:"04/20/23",
		range_end:"04/30/23",
		condition:"Acceptable",
		item_description:"DEWALT 20-volt drill. If you need to do some repairs or building this will do the job",
		building_id:3,
		lender_id:1,
		item_type_id:1
	})
	
	/////// MESSAGES //////////////////////////////////////////
	const m1 = await Message.create({
		message_id: 1,
		message_content: "Hi, This is Dan from room 540. Can we arrange a time to meet today anytime after 3pm?",
		sender_id: 1,
		listing_id: 5
	})

	const m2 = await Message.create({
		message_id: 2,
		message_content: "Hey Dan. Sure! I can meet at 6pm today. I'm on the 7th floor. Wanna meet halfway? 6th floor",
		sender_id: 2,
		listing_id: 5
	})

	const m3 = await Message.create({
		message_id: 3,
		message_content: "Sounds great! See you then",
		sender_id: 1,
		listing_id: 5
	})

	const m4 = await Message.create({
		message_id: 4,
		message_content: "Hey dude, I got a problem. My dog just ate one of the jenga pieces",
		sender_id: 2,
		listing_id: 2
	})

	const m5 = await Message.create({
		message_id: 5,
		message_content: "I'm calling the police",
		sender_id: 1,
		listing_id: 2
	})

	////// REQUESTS ////////////////////////////////////////////

	const r1 = await Request.create({
		item_requested: "Spray Paint",
		content:"Gonna tag the mayors office, hmu",
		building_id: 3,
		requester_id: 1
	})

	const r2 = await Request.create({
		item_requested: "Paper Plates",
		content:"Need some paper plates for a party I'm throwing with the boys. Will wash and return them, dw.",
		building_id: 3,
		requester_id: 2
	})

	
}

// Export the database seeding function
module.exports = seedDB;