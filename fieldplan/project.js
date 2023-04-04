var shape = []
var grid = []
var polygonComplete = false
var gridComplete = false
var locationTolerance = 10
var gridSize = 5
var satImage

function preload() {
}
function setup() {
  satImage = loadImage("image.png")
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0)
  satImage.resize(0,cnv.height*.2)
  clear()
  pixelDensity(1);
  background(0, 0, 0, 0);
  // noLoop()
}
function draw() {
  // console.log(polygonComplete)
  background(0,0,0,0);
  clear()
  strokeWeight(1)
  stroke(255,0,0)
  fill(0)
  if (!polygonComplete) {
    drawPolygon(shape)
    polygon(mouseX,mouseY,gridSize,6)
  } else if (!gridComplete) {
    beginShape()
    for (let i = 0; i < shape.length; i++){
      vertex(shape[i].x, shape[i].y)
    }
    endShape()
  }
  if (polygonComplete) {
    drawGrid(shape)
  }
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }

function drawPolygon(vertixList) {
  imageMode(CENTER)
    if (windowWidth < windowHeight) {
      satImage.resize(0, windowHeight*.9)
    } else {
      satImage.resize(windowWidth*.9, 0)
    }
  image(satImage, width*.5, height*.5)
    if (vertixList.length > 0 && !gridComplete) {
    for (let v = 0; v < vertixList.length; v++){
      point(vertixList[v].x, vertixList[v].y)
      if (v < vertixList.length-1) {
       line(vertixList[v].x,vertixList[v].y,vertixList[v+1].x,vertixList[v+1].y) 
      } else if (!polygonComplete) {
        if (p5.Vector.dist(createVector(mouseX, mouseY), vertixList[0]) < locationTolerance) {
            line(vertixList[v].x,vertixList[v].y,vertixList[0].x,vertixList[0].y)
        } else {
          line(vertixList[v].x,vertixList[v].y,mouseX,mouseY)
          }
      }
    }
    }
}

function drawGrid() {
  //grid settings
  let hWidth = gridSize * 2
  let hHeight = Math.sqrt(3)*gridSize

  //calculate grid
  if (!gridComplete) {
    loadPixels()
    for (let w = 0; w < width; w += hWidth *1.5) {
      for (let h = 0; h < height; h += hHeight) {
        let pix = get(w, h)
        if (pix[3] > 0) {
          grid.push(createVector(w, h))
        }
      }
    }
    for (let w = hWidth*.75; w < width; w += hWidth *1.5) {
      for (let h = hHeight*.5; h < height; h += hHeight) {
        let pix = get(w, h)
        if (pix[3] > 0) {
          grid.push(createVector(w, h))
        }
      }
    }
    gridComplete = true
  }

  //draw grid
  if (gridComplete) {
    imageMode(CENTER)
    if (windowWidth < windowHeight) {
      satImage.resize(0, windowHeight*.9)
    } else {
      satImage.resize(windowWidth*.9, 0)
    }
    image(satImage, width*.5, height*.5)
    for (i of grid) {
      push()
      stroke(255,0,0)
      strokeWeight(1)
      noFill()
      polygon(i.x,i.y,gridSize,6)
      pop()
    }
  }
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mouseClicked() {
  if (!polygonComplete) {
    if (shape.length>1 && p5.Vector.dist(createVector(mouseX, mouseY), shape[0]) < locationTolerance) {
      shape.push(shape[0])
      polygonComplete = true
    } else {
      shape.push(createVector(mouseX, mouseY))
    }
}
}
