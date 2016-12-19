var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var urlEncodedParser = bodyParser.urlencoded({
    extended: true
}); // end var urlEncoderParser
var port = process.env.PORT || 3000;
// create connection string to the database
var connectionString = 'postgres://localhost:5432/ToDoList';
var tasks = [];

app.listen(port, function(req, res){
  console.log('server listening on', port);
}); //end app.listen

app.get('/', function(req, res){
  res.sendFile(path.resolve('client/index.html'));
}); //end base url


//------sending new task to the database------//
app.post('/postTask', urlEncodedParser, function(req, res){
  console.log('adding new task:', req.body);
  // var task = req.body.task;
  tasks.push(req.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('connected to database receiving: ' + req.body);
      client.query('INSERT INTO toDo(task, completed) VALUES($1, $2)', [req.body.task, req.body.completed]);
      done();
      res.send('successfully posted to DB');
    }
  }); //end pg.connect
}); //end app.post/postTask


//--------updating task in database to true when task is complete------//
app.put('/taskCompleted', urlEncodedParser, function(req, res){
  console.log('updating database:', req.body);
  pg.connect(connectionString, function(err, client, done){
  if (err){
     console.log("put");
   } else {
     var query = client.query('UPDATE todo SET completed = TRUE WHERE id = $1', [req.body.id]);
     done();
    }
  });
});//end app.put

//---------getting current info from the database and sending to the client---//
app.get('/getTask', function(req, res){
  console.log('getting tasks');
  //connect to database
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error connecting to database' + err);
    } else {
      console.log('connected to DB');
      var tasks = [];
      var query = client.query('SELECT * from todo');
      query.on('row', function(row){
        tasks.push(row);
      });//end query.on row
      query.on('end', function(){
        done();
        console.log('sending array back to client' + tasks);
        res.send(tasks);
      }); //end query.on
    }//end else statement
  }); //end pg.connect
});//end /getTask


//-------deleting task from database-----------//
app.delete ('/taskDeleted', urlEncodedParser, function(req, res){
      console.log('in delete task');
  pg.connect(connectionString, function(err, client, done){
    if (err){
    console.log("problem with delete");
    } else {
  client.query('DELETE FROM todo WHERE id = $1', [req.body.id]);
  query.on('row', function(row){
    tasks.push(row);
  });//end query.on row
    query.on('end', function(){
      done();
      res.send('its deleted!');
    });//end query.on end
    }
  });//end pg.connect
});//end app.delete



app.use(express.static('client'));
