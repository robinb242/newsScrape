var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");

//require request and cheerio to scrape
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

//Require models
var Note = require('../models/note.js');
var Headline = require('../models/headline.js');

//index
app.get('/', function(req, res) {
    res.redirect('/headlines');
});

// A GET route for scraping the echojs website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://arstechnica.com").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});
// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbHeadline) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbHead);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
