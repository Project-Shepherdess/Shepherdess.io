var field = []
var headCount = 20
var headSize = 8
var fw = 50
var fh = fw
var heardOne

function setup() {
  createCanvas(fw*3.00*(headSize/2), fh*1.7844*(headSize/2));
  fieldRect(-9, 1, fw, fh, headSize/2);
  newPopSheep(width/2,height/2,headCount,headSize)
  heardOne = new Heard(0,0,150)
}

function draw() {
  clear()
  background(102)

  for (head of popSheep) {
    if (keyIsDown(81)) {
      head.isFleeing = true
      head.isSeeking = false
    } 
  }
  

  for (tile of field) {
    tile.is()
  }

  for (let head of popSheep) {
    head.is()
  }

  heardOne.is()
}

// function CQ() {
//   for (head of heard) {
//     head.isFleeing = false
//     head.isSeeking = false
//   }
// }
// function keyPressed() {
//   for (head of heard) {
//     if (value == "q") {
//       head.isFleeing = true
//     }
//   }
// }

// function mouseReleased() {
//   for (head of heard) {
//     head.isFleeing = false;
//   }
// }

// function mousePressed() {
//   for (sheep of flockSheep) {
//     sheep.fleeing = createVector(mouseX, mouseY);
//     sheep.isFleeing = true;
//   }
// }

// function mouseReleased() {
//     for (sheep of flockSheep) {
//       sheep.isFleeing = false;
//   }
// }