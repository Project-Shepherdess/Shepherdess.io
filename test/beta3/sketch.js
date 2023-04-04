var herds = []
var sheepPop = []
var field = []

var headCount = 50
var headSize = 8
var ts = headSize
var fw = 100
var fh = 50
var border = 20
var cw = fw*(ts*.75)+ts/4
var ch = (fh)*(ts)+ts/2

var heardOne

function setup() {
  // frameRate(100)
  createCanvas(cw + border*2, ch + border*2);
  fieldRect(border, border, fw/2, fh, ts);
  newSheepPop(width/2,height/2,headCount,headSize)
  // console.log(sheepPop.length)
  // newHerd()
  // bound(members)
  // var button = createButton("reset")
  // button.mousePressed(resetSketch)
}

function resetSketch() {
  herds.length = 0
  sheepPop.length = 0
  field.length = 0

  createCanvas(cw + border * 2, ch + border * 2);
  fieldRect(border, border, fw / 2, fh, ts);
  newSheepPop(width / 2, height / 2, headCount, headSize)
}

function draw() {
  clear()
  background(0)
  let instructions = "Hold down the space-bar and nudge a sheep to activate the herding function, release the space-bar to end the function."
  fill(256,0,0)
  noStroke()
  textSize(12)
  text(instructions,5,10)

  for (tile of field) {
    tile.is()
  }

  // fence
  let fenceX = 0 + border
  let fenceY = 0 + border + ts / 4
  let fenceWidth = width - border * 2
  let fenceHeight = height - border * 2 - ts / 2


  for (let head of sheepPop) {
    head.is()
  }

  noFill()
  stroke(100)
  strokeWeight(ts/2)
  rect(fenceX, fenceY, fenceWidth, fenceHeight)

  var locList = []

  for (let sheep of sheepPop) {
      locList.push(sheep.pos)
  }
  
  // console.log(locList)
  ozimandius(locList)

  for (let herd of myWorks) {
    if (herd.length>1){
      bound(herd)
    }
  }
  
  contain()
}