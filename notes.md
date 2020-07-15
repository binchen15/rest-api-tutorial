1.	Intro

REST:
	REpresentational State Transfer

2.	set up

3.	http methods

	CRUD 
		POST,GET,PUT, DELETE

4.	set up express app

5.	handling requests

	(req, res) =>{
		res.send(); 
		// res.end();
	}

6.	creating routes

e.g.,

const express = require('express');
const router = express.Router();

// get list of ninjas
router.get("/ninjas", (req, res)=>{
  res.send({type:"GET"})
})

// create a ninja
router.post("/ninjas", (req, res)=>{
  res.send({type:"POST"})
})

app.use("/api", router)

7. Postman

8.	handling POST request (middleware)

	app.use(middleware)
	order matters
		e.g., body-parser should go first

	npm i body-parser

9.	models and schema

10.	connecting to mongodb

```
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/ninjago", 
  {useNewUrlParser: true, useUnifiedTopology: true });
```

	install Robo 3T (Robo Mongo)

11.	error handling via middleware

```
// error handling middleware
app.use( (err, req, res, next) => {
  console.log(err);
  res.status(422).send({error: err.message})
})
```

```
// create a ninja
router.post("/ninjas", (req, res, next)=>{
  console.log(req.body); // used the body-parser.json() middleware
  // let ninja = new Ninja(req.body);
  // ninja.save();  // persist the data 
  Ninja.create(req.body).then(ninja => {
    res.send(ninja);
  }).catch(next)
})
```

12.	Handling Delete requests


	Model.findByIdAndDelete({_id:req.params.id})

13.	put request

```
Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(ninja=>{
    // res.send(ninja); // ond ninja
    Ninja.findOne({_id:req.params.id}).then(ninja=>{
      res.send(ninja);
    })
  })
```

14.	GeoJSON

```
router.get("/ninjas", (req, res, next)=>{
  Ninja.aggregate().near({
    near: { type: "Point",
            coordinates: [  parseFloat(req.query.lng),
                            parseFloat(req.query.lat) ]},
    maxDistance: 1000000, 
    spherical:true,
    distanceField:"dis"
  }).then( ninjas => {
    res.send(ninjas);
  })
})
```

15.	Front-end via react
16.	


