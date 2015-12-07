var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require('pg');


app.use(express.static('public'));

app.get('/', function (req, res, next) {

  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'index.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});


app.get('/points', function(req, res, next) {
  // Query pg
  // res.json(points);
});


io.on('connection', function(socket){
  console.log('a user connected');

  // Handle a new point
  socket.on('new point', function(point, success) {
    console.log('i got a new point');
    io.emit('new point', point);
    success(true);
  });

  // Handle the removal of a point
  socket.on('remove point', function(point, success) {
    console.log('i am removing a point');

    io.emit('remove point', point);
    success(true);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
