var headCount = 300
var headSize = 4
var ts = headSize*2
var fieldWidth = 30
var fieldHeight = 30

var border = 10
var canvisWidth = fieldWidth * (ts * .75) + ts / 4
var canvisHeight = (fieldHeight) * (ts) + ts / 2
var fr = 120

function setup() {
  frameRate(fr)
  createCanvas(canvisWidth + border * 2, canvisHeight + border * 2);
  createField(border, border, fieldWidth / 2, fieldHeight, ts);
  newSheepPop(width / 2, height / 2, headCount, headSize)
  // testSheep(width / 2, height / 2, headCount, headSize)
}

function draw() {
  clear()
  background(0)

  fieldIs()
  sheepPopIs()
  // shepherdessIs(sheepPop)
  


  // fence
  let fenceX = 0 + border
  let fenceY = 0 + border + ts / 4
  let fenceWidth = width - border * 2
  let fenceHeight = height - border * 2 - ts / 2
  noFill()
  stroke(100)
  strokeWeight(ts / 2)
  rect(fenceX, fenceY, fenceWidth, fenceHeight)
}