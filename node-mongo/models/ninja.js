const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// gelocation schema
const GeoSchema = new Schema({
	type: {
		type: String,
		default:"Point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	},
})

// create schema and model
const NinjaSchema = new Schema({
	name: {
		type: String,
		required: [true, "name required"],
	},
	rank:{
		type: String,
	},
	available:{
		type: Boolean,
		default: false
	},
	// need geo location
	geometry: GeoSchema,	
})

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;


