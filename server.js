// Read and set environment variables
require("dotenv").config();

var express = require("express");
//App is using express.
var app = express();
var bodyParser = require("body-parser");

var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
//Requiring models
var db = require("./models");


// Use morgan logger for logging requests
app.use(logger("dev"));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
//require("./controllers/fetch.js")(app);
//require("./controllers/headline.js")(app);
//require("./controllers/note.js")(app);

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useMongoClient:true});

//require("./controllers/fetch.js")(app);
//require("./controllers/headline.js")(app);
//require("./controllers/note.js")(app);


//Set mongoose to leverage built in javascript ES6 promises
//connect to the mongo database

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});