var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/usersdb";

app.set("view engine", "pug");

app.get("/", function(req, res) {
	res.render("index");
});


app.use(express.static(__dirname + "/public"));


app.get("/api/users", function(req, res) {
	
	mongoClient.connect(url, function(err, db) {
		if (err) return console.log(err);

		db.collection("users").find({}).toArray(function(err, users) {
			res.send(users);
			db.close();
		});
		
	});

});

app.get("/api/users/:id", function(req, res) {
	var id = new objectId(req.params.id);
	mongoClient.connect(url, function(err, db) {
		
		db.collection("users").findOne({_id: id}, function(err, user) {
			if (err) return res.status(400).send();
			res.send(user);
			db.close();
		});

	});
});

app.post("/api/users", jsonParser, function(req, res) {
	if (!req.body) return res.sendStatus(400);

	var userName = req.body.name;
	var userRank = req.body.rank;
	var userScore = req.body.score;
	var user = { name: userName, rank: userRank, score: userScore };

	mongoClient.connect(url, function (err, db) {

		db.collection("users").insertOne(user, function(err, result) {
			if (err) return res.sendStatus(400).send();

			res.send(user);
			db.close();
		});

	});
});

app.delete("/api/users/:id", function(req, res) {
	
	var id = new objectId(req.params.id);
	mongoClient.connect(url, function(err, db) {
		db.collection("users").findOneAndDelete({_id: id}, function(err, result) {
			if (err) return res.sendStatus(400).send();

			var user = result.value;
			console.log(user);
			res.send(user);
			db.close();
		});
	});

});

app.put("/api/users", jsonParser, function (req, res) {

	if (!req.body) return res.sendStatus(400);
	var id = new objectId(req.body.id);
	var userName = req.body.name;
	var userRank = req.body.rank;
	var userScore = req.body.score;

	mongoClient.connect(url, function (err, db) {
		db.collection("users").findOneAndUpdate({ _id: id }, { $set: { name: userName, rank: userRank, score: userScore } },
			{ returnOriginal: false }, function (err, result) {

				if (err) return res.status(400).send();

				var user = result.value;
				res.send(user);
				db.close();
			});
	});
});

app.listen(3000, function() {
	console.log("Сервер работает...");
});