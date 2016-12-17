var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var urlEncodedParser = bodyParser.urlencoded({
    extended: true
}); // end var urlEncoderParser
var port = process.env.PORT || 3000;
// create connection string to our database
var connectionString = 'postgres://localhost:5432/ToDoList';
var fromClient = [];
console.log(fromClient);

app.listen(port, function(req, res){
  console.log('server listening on', port);
}); //end app.listen
// app.use(bodyParser.json());
app.get('/', function(req, res){
  // console.log('Base url hit!');
  res.sendFile(path.resolve('client/index.html'));
}); //end base url

app.post('/postTask', urlEncodedParser, function(req, res){
  console.log('adding new task:', req.body);
  var task = req.body.task;
  fromClient.push(req.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('connected to database receiving: ' + req.body);
      client.query('INSERT INTO ToDoList(task) VALUES($1)', [req.body.task]);
      done();
      res.send('success post ToDoList');
    }

  }); //end pg.connect
}); //end app.post/postTask








app.use(express.static('client'));
