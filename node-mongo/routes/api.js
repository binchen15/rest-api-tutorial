const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja')

// get list of ninjas
router.get("/ninjas", (req, res, next)=>{
	Ninja.aggregate().near({
		near: {	type: "Point", 
						coordinates: [	parseFloat(req.query.lng), 
														parseFloat(req.query.lat) ]},
		maxDistance: 1000000, 
		spherical:true,
		distanceField:"dis"
	}).then( ninjas => {
		res.send(ninjas);
	})
})

// create a ninja
router.post("/ninjas", (req, res, next)=>{
	console.log(req.body); // used the body-parser.json() middleware
	// let ninja = new Ninja(req.body);
	// ninja.save();	// persist the data 
	Ninja.create(req.body).then(ninja => {
		res.send(ninja);
	}).catch(next)
})

// update a ninja
router.put("/ninjas/:id", (req, res, next)=>{
	Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(ninja=>{
		// res.send(ninja); // ond ninja
		Ninja.findOne({_id:req.params.id}).then(ninja=>{
			res.send(ninja);
		})
	})
})


// delete a ninja
router.delete("/ninjas/:id", (req, res, next)=>{
	console.log(req.params.id);
	Ninja.findByIdAndRemove({_id: req.params.id}).then(ninja=>{
		res.send(ninja);
	})
})

module.exports = {router};

