const express = require('express');
const bodyParser = require('body-parser');
const {router} = require('./routes/api');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/ninjago", 
	{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,});

// middleware for static file
app.use(express.static("public"));

app.use(bodyParser.json()) // register middleware

app.use("/api", router);

app.get("/", (req, res)=>{
	console.log(`GET reqeust ${req.url}`)
	res.send("Hey!")
})

app.get("/api", (req, res)=>{
	console.log(`GET reqeust ${req.url}`)
	res.send({name:"Yoshi"})
})

// error handling middleware
app.use( (err, req, res, next) => {
	console.log(err);
	res.status(422).send({error: err.message})
})

app.listen(process.env.port || 3000, ()=>{
	console.log('app start listening on port 3000')
});
