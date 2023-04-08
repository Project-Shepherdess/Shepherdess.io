function FieldCanvas(cornerX, cornerY, gridWidth, gridHeight, tileWidth) {
    var fieldMap = []

    let tileRadius = tileWidth * .5
    let verticalHexSpacing = tileRadius * sqrt(3)
    let horizontalHexSpacing = tileRadius * 3

    for (i = 0; i < gridHeight; i++) {

        let rowStartY =
            cornerY
            + tileRadius
        let rowY = rowStartY + (verticalHexSpacing * i)  // row y
        let columnStartX = cornerX + tileRadius

        for (ii = 0; ii < gridWidth * .5; ii++) {
            let columnX = columnStartX + (ii * horizontalHexSpacing)
            fieldMap.push(
                new Tile(
                    createVector(columnX,rowY),
                    tileWidth, // width of tile from point to point
                    fieldMap.length + 1
                )
            );
        }
        
        rowStartY += (verticalHexSpacing * .5)
        rowY = rowStartY + (verticalHexSpacing * i)  // row y
        columnStartX += horizontalHexSpacing * .5
        
        for (ii = 0; ii < gridWidth * .5; ii++) {
            let columnX = columnStartX + (ii * horizontalHexSpacing)
            fieldMap.push(
                new Tile(
                    createVector(columnX,rowY),
                    tileWidth, // width of tile from point to point
                    // fieldMap.length + 1
                )
            );
        }
    }

    var canvasWidth = gridWidth
        * (tileWidth * .75)
        + tileWidth / 4
        + canvasBorder * 2
    let canvasHeight = gridHeight
        * (tileWidth * .5 * sqrt(3))
        + tileWidth / 2
        + canvasBorder * 2
    
    createCanvas(canvasWidth, canvasHeight);

    field = fieldMap

}
  
function logistic(t) {
    return 1/(1+(Math.E**(t*-1)))
}

class Tile {
    constructor(pos, tileWidth, tileID) {

        this.pos = pos
        this.size = tileWidth / 2
        this.stroke = 255
        this.strokeWeight = tileWidth*.1
    }
mouse
    is() {
        if (mousePos.dist(this.pos) < this.size * .9) {
            hover = this.pos
        } 

        this.form()
    }

    form() {
        push()

        // fill(this.fill)
        noFill()
        stroke(255)
        strokeWeight(this.strokeWeight);

        beginShape();
        for (
            let a = 0;
            a < TWO_PI;
            a += TWO_PI / 6){
            vertex(
                this.pos.x + cos(a) * this.size,
                this.pos.y + sin(a) * this.size
            );
        }
        endShape(CLOSE);

        pop()
    }
    // dead(){
    //         let c = 255*this.growth
    //         let angle = TWO_PI / 6;
    //         fill(300,0,0,c)
    //         // stroke(this.stroke)
    //         noStroke()
    //         strokeWeight(this.strokeWeight);
    //         beginShape();
    //         for (let a = 0; a < TWO_PI; a += angle) {
    //         let sx = this.x + cos(a) * this.s;
    //         let sy = this.y + sin(a) * this.s;
    //         vertex(sx, sy);
    //         }
    //         endShape(CLOSE);
    // }

    // grow() {
    //     if (this.growthTime < 13 && this.growth < 1) {
    //         this.growthTime = this.growthTime + this.growthRate;
    //         this.growth = logistic(this.growthTime)
    //     }
    //     if (this.growthTime > 13 || this.growth > 1)  {
    //         this.growthTime = 13;
    //         this.growth = 1
    //     }
    //     if (this.growth <= .3) {
    //         this.isdead = true
    //     }
    // }


    // eat(rate) {
    //     if (this.growth > 0) {
    //         this.growthTime = this.growthTime - rate;
    //         this.growth = logistic(this.growthTime)
    //     }
    // }
}

class Tree {
    constructor(pos, tileWidth) {
        this.pos = pos
        this.radius = tileWidth*2
        this.fill = color(0,255,0,100)
    } 

    is() {
        this.form()
    }

    form() {
        push()
        fill(this.fill)
        circle(this.pos.x, this.pos.y, this.radius)
        pop()
    }
}

class Grass {
    constructor(pos, tileWidth) {
        this.pos = pos
        this.radius = tileWidth*.5
        this.fill = color(0,100,100,255)
    } 

    is() {
        this.form()
    }

    form() {
        push()

        fill(this.fill)
        beginShape();
        for (
            let a = 0;
            a < TWO_PI;
            a += TWO_PI / 6){
            vertex(
                this.pos.x + cos(a) * this.radius,
                this.pos.y + sin(a) * this.radius
            );
        }
        endShape(CLOSE);

        pop()
    }
}