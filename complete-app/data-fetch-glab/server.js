var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require("pg");
var path = require('path');
var credentials = require("./credentials.example.js");

app.use(express.static('public'));

app.enable('trust proxy');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '/public/')));


app.get('/', function (req, res, next) {

    // var options = {
    //     root: __dirname + '/public/',
    //     dotfiles: 'deny',
    //     headers: {
    //         'x-timestamp': Date.now(),
    //         'x-sent': true
    //     }
    // };

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

})




io.on('connection', function(socket){

    console.log('a user connected');
    
    socket.on('new connection', function(point) {
        console.log('I got a new connection');

        var sql = '';
        queryPg(
            sql, 
            function(err, result) {
            }
        );
        io.emit('many points', points);
    });
    
    socket.on('new point', function(point) {
        console.log('I got a new point that has ' + point.descrip);
        var sql = 'INSERT INTO points (id, descrip, lat, lng) VALUES ($1, $2, $3, $4)';
        queryPg(
            sql, 
            [point._id, point.descrip, point.lat, point.lng], 
            function(err, result) {}
        );
        io.emit('new point', point);
    });
});

var queryPg = function(sql, params, callback) {
    pg.connect(
        "postgres://" + credentials.pg.user + "@" + credentials.pg.host + ":" + credentials.pg.port + "/" + credentials.pg.database, 
        function(err, client, done) {
            if (err) {
                console.log("error", "error connecting - " + err);
                callback(err);
            } 
            else {
                var query = client.query(sql, params, function(err, result) {
                    done();
                    if (err) {
                        console.log("error", err);
                        callback(err);
                    } 
                    else {
                        callback(null, result);
                    }
                }.bind(this));
            //console.log(query.text, query.values);
            }
        }.bind(this));
};

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.get('/get_all_points', function (req, res) {
    var sql = 'SELECT id, descrip, lat, lng FROM points WHERE id IS NOT null';
    queryPg(
        sql,'',
        function(err, result) {
            // console.log(result)
            res.json(result.rows);
        }
    );
    

});
