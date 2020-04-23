var socket = io();

function preload() {
   crab = loadImage("assets/crab.png")
}
//basic variables

var p = {
    w: 46.7,
    h: 31.1,
}


// stuff
function setup() {
    createCanvas(500,500)
}

function draw() {
    socket.on('newPositions',function(data){
        clear()
        background("#aed2e8")
        for(var i = 0 ; i < data.length; i++) {
            fill("#0000ff")
            image(crab,data[i].x,data[i].y,p.w,p.h);  
        }  
    });

    if (keyIsDown(LEFT_ARROW)) {
        socket.emit('keyPress',{inputId:'left',state:true});
    } else {
        socket.emit('keyPress',{inputId:'left',state:false});
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        socket.emit('keyPress',{inputId:'right',state:true});
    } else {
        socket.emit('keyPress',{inputId:'right',state:false});
    }
    
    if (keyIsDown(UP_ARROW)) {
        socket.emit('keyPress',{inputId:'up',state:true});
    } else {
        socket.emit('keyPress',{inputId:'up',state:false});
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        socket.emit('keyPress',{inputId:'down',state:true});
    } else {
        socket.emit('keyPress',{inputId:'down',state:false});
    }
    
}

