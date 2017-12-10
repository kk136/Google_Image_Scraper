/*
Name        :   server.js
Author      :   Kartikey Agarwal
Date        :   10/12/2017
Description :   Contain routes as well as Mongoose Model
*/



//Spells
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var app     = express();
var bodyParser = require('body-parser');
const scrape = require('./app.js')
const port = process.env.PORT || 2000;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Keyword');

//Mongoose Model
var Keyword = mongoose.model('Keyword',{
  name:{
    type : String,
    unique : true
  }
});


app.use(express.static(path.join(__dirname, './Public')));

// Lists all Keywords
app.get('/list',function(req,res){
  Keyword.find(function(err, keywords) {
    if (err)
    res.send(err)
    res.json(keywords); // return all Keywords in JSON format
  });
});


//Calls scraping script in app.js
app.post('/scrap', function(req, res) {
  var query= req.body.text;

  //Creates new document in Mongoose
  var newKeyword = new Keyword({
    name: query
  });

  //Saves the new document
  newKeyword.save().then(() =>{
    scrape.getImages(`https://www.google.co.in/search?tbm=isch&q=${query}`,query);

    // Save success fetches all keywords
    Keyword.find(function(err, keywords) {
      if (err)
      res.send(err)
      res.json(keywords);  // return all Keywords in JSON format
    });
  },(e) => {
    // Save unsuccessful fetches all keywords
    Keyword.find(function(err, keywords) {
      if (err)
      res.send(err)
      res.json(keywords);  // return all Keywords in JSON format
    });
  });
});


app.listen(port)

console.log(`Magic happens on port ${port}`);
