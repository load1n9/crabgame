var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var express = require('express');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
const port = 8000;
app.set('port', 5941);
app.use('/', express.static(__dirname + '/client'));
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(port, function() {
  console.log(`starting on ${port}`);
});

var SOCKET_LIST = {};
var PLAYER_LIST = {};

class Player {
    constructor(id) {
       this.x = 30,
       this.y = 30,
       this.id = id,
       this.pressingRight = false,
       this.pressingLeft = false,
       this.pressingUp = false,
       this.pressingDown = false,
       this.number = '' + Math.floor(10 * Math.random());
       this.updatePosition = function(){
        if(this.pressingRight) {
            this.x += 5;
        }
        if(this.pressingLeft) {
            this.x -= 5;
        }
        if(this.pressingUp) {
            this.y -= 5;
        }
        if(this.pressingDown) {
            this.y += 5;
        }
       }
    }
}

io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
 
    var player = new Player(socket.id);
    PLAYER_LIST[socket.id] = player;
   
    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
   
    socket.on('keyPress',function(data){
        if(data.inputId === 'left')
            player.pressingLeft = data.state;
        else if(data.inputId === 'right')
            player.pressingRight = data.state;
        else if(data.inputId === 'up')
            player.pressingUp = data.state;
        else if(data.inputId === 'down')
            player.pressingDown = data.state;
    });
   
   
});
 
setInterval(function(){
    var pack = [];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            x:player.x,
            y:player.y,
            number:player.number
        });    
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
   
   
   
   
},1000/25);