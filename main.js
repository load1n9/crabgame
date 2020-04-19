function preload() {
   crabasset1 = loadImage("assets/crab.png")
}
//basic variables

var p = {
    x : 0,
    y: 450,
    w: 46.7,
    h: 31.1,
}


// stuff
function setup() {
    createCanvas(500,500)
}

function draw() {
    clear()
    background("#aed2e8")
    playerstuff()
    
}

function playerstuff() {
    image(crabasset1,p.x,p.y,p.w,p.h)
    if (keyIsDown(LEFT_ARROW)&& p.x >= 10) {
        p.x -= 5;
    }
    
    if (keyIsDown(RIGHT_ARROW)&& p.x <= 490) {
        p.x += 5;
    }
}



function move1(){
  p.x += 5;
}

function move2(){
    p.x -= 5;
}