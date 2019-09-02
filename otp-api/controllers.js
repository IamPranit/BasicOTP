module.exports = {
	createAccount: (req, res, next) => {
		console.log(req.body)
		const email = req.body.email	

		const random = Math.floor(100000 + Math.random() * 900000)
		const MongoClient = require('mongodb').MongoClient;
		const assert = require('assert');
		 
		// Connection URL
		const url = 'mongodb://localhost:27017';
		 
		// Database Name
		const dbName = 'otp';
		 
		// Use connect method to connect to the server
		MongoClient.connect(url, function(err, client) {
		  assert.equal(null, err);
		  console.log("Connected successfully to server");
		 
		  const db = client.db(dbName);

		  const collection = db.collection('user');

		  collection.insertMany([
			    {email : email, otp: random}
			  ], function(err, result) {
			    assert.equal(err, null);
			    assert.equal(1, result.result.n);
			    assert.equal(1, result.ops.length);

			    		  res.json({
		  	status: true,
		  	data: result,
		  	message: "account created"
		  })
			  });

		  client.close();
		});

	},

	sendOtp: (req, res, next) => {
		const email = req.params.email


		const MongoClient = require('mongodb').MongoClient;
		const assert = require('assert');
		 
		// Connection URL
		const url = 'mongodb://localhost:27017';
		 
		// Database Name
		const dbName = 'otp';
		 
		// Use connect method to connect to the server
		MongoClient.connect(url, function(err, client) {
		  assert.equal(null, err);
		  console.log("Connected successfully to server");
		 
		  const db = client.db(dbName);

		  const collection = db.collection('user');

			collection.find({'email': email}).toArray(function(err, docs) {
			    assert.equal(err, null);
			    console.log("Found the following records");
			    console.log(docs);

			    		  res.json({
		  	status: true,
		  	data: docs,
		  	message: "fetched data"
		  })
		  	});	

		});

	},

	validateOtp: (req, res, next) => {
		const email = req.body.email
		const otp = req.body.otp


		const MongoClient = require('mongodb').MongoClient;
		const assert = require('assert');
		 
		// Connection URL
		const url = 'mongodb://localhost:27017';
		 
		// Database Name
		const dbName = 'otp';
		 
		// Use connect method to connect to the server
		MongoClient.connect(url, function(err, client) {
		  assert.equal(null, err);
		  console.log("Connected successfully to server");
		 
		  const db = client.db(dbName);

		  const collection = db.collection('user');

			collection.find({'email': email, 'otp': otp}).toArray(function(err, docs) {
			    assert.equal(err, null);
			    console.log("Found the following records");
			    console.log(docs);

			    		  res.json({
		  	status: true,
		  	data: docs,
		  	message: "fetched data"
		  })
		  	});	

		});
	}
}