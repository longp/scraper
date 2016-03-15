var express = require('express');
var app = express();
var cheerio = require('cheerio');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended: false}))
//handlebars setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect("mongodb://localhost/redditScraper");
var db = mongoose.connection;
db.on('error', function(err) {
  console.log("mongoose err:", err)
});
db.once('open', function () {
  console.log('Mongoose connection success');
})
var League = require("./models/leagueModel.js");

app.get('/', function(req, res){
  request('https://reddit.com/r/leagueoflegends/', function (err, res, html) {
    var $ = cheerio.load(html);
    var result = [];
    if (err) {
      throw err
    }
    $('a.title').each(function(i,  element) {
      var title = $('p.title').text();
      var body = $('div.md').text();
      var Post = new League({
        title:title,
        body:body
      })
      Post.save(function (err, doc) {
        if(err) {
          console.log(err)
        }
      })
    })
  })
  res.render('index')
})

app.get("/display", function(req, res) {
  res.json("text")
})



app.listen(3000)
