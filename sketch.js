var herds = []
var sheepPop = []

var field = [] // location grid
var hover // grid space that is under mouse

// var trees = {} // dictionary of tree objects
// var grass = {} // dictionary of grass objects

var actOrder = ['Grass','Tree']
var surface = {} 

var headCount = 50
var headSize = 8

var tileWidth = 10
var gridWidth = 100
var gridHeight = 40
var canvasBorder = 10 // width of border around field
  
var gridColor = 255

var mousePos

const log = (data) => console.log(data)

function setup() {
  FieldCanvas(canvasBorder, canvasBorder, gridWidth, gridHeight, tileWidth, gridColor);
}

function resetSketch() {
  herds.length = 0
  sheepPop.length = 0
  field.length = 0

  createCanvas(cw + canvasBorder * 2, ch + canvasBorder * 2);
  FieldCanvas(canvasBorder, canvasBorder, gridWidth / 2, gridHeight, tileWidth);
  // newSheepPop(width / 2, height / 2, headCount, headSize)
}

function draw() {

  clear()
  background(0)
  let instructions = "Hold down the space-bar and nudge a sheep to activate the herding function, release the space-bar to end the function."
  fill(256,0,0)
  noStroke()
  textSize(canvasBorder)
  text(instructions, 5, 10)
  
  mousePos = createVector(mouseX, mouseY)

  //actualize grid
  for (tile of field) {
    tile.is()
  }

  //actualize surface
  let actOrder = ['Grass','Herb','Shrub','Tree']
  if (Object.keys(surface).length > 0) {
    for (act of actOrder) {
      for (pos of Object.keys(surface)) {
        if (surface[pos].constructor.name == act)
          surface[pos].is()
      }
    }
  }

  // fence
  let fenceX = 0 + canvasBorder
  let fenceY = 0 + canvasBorder + tileWidth / 4
  let fenceWidth =
    width
    - canvasBorder * 2
  let fenceHeight =
    height
    - canvasBorder * 2
    - tileWidth / 2
    + tileWidth * .1 // tile border width


  // for (let head of sheepPop) {
  //   head.is()
  // }

  noFill()
  stroke(gridColor)
  strokeWeight(tileWidth*.5)
  rect(fenceX, fenceY, fenceWidth, fenceHeight)

  var locList = []

  // for (let sheep of sheepPop) {
  //     locList.push(sheep.pos)
  // }
  
  // console.log(locList)
  // ozimandius(locList)

  // for (let herd of myWorks) {
  //   if (herd.length>1){
  //     bound(herd)
  //   }
  // }
  
  // contain()
}

function mouseClicked() {

  let sucOrder = ['Grass','Herb','Shrub','Tree']
  try {
    if (surface[hover].constructor.name == 'Grass') {
      surface[hover] = new Tree(
        hover,
        tileWidth, // width of tile from point to point
      )
    }
  } catch {
    surface[hover] = new Grass(
      hover,
      tileWidth, // width of tile from point to point
    )
  }


  log(surface[hover].constructor.name)
  
  // trees[hover] = new Tree(
  // hover,
  // tileWidth, // width of tile from point to point
  // )

  // console.log(grass)
}