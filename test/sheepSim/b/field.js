var field = []

function fieldIs(){
    for (let tile of field) {
        tile.is()
    }
}

function createField(x, y, h, w, s) {
    for (i = 1; i <= w ; i++) {
      for (ii = 0; ii < h; ii++){
        field.push(new Tile(x + s/2 + (ii*((s)*1.5)), y + -s/2 + (i*(s)), s,field.length-1));
      }
      for (ii = 0; ii < h; ii++){
        field.push(new Tile(x+ s*1.25 + (ii*((s)*1.5)), y + (i*(s)), s,field.length-1));
      }
    }
  }
  
  function logistic(t) {
      return 1/(1+(Math.E**(t*-1)))
  }

class Tile {
    constructor(x, y, s, n) {
        this.x = x
        this.y = y
        this.pos = createVector(x,y)
        this.s = s/2
        this.growthTime = 13
        this.growth = 1
        this.growthRate = .0001
        this.stroke = 0
        this.strokeWeight = 1
        this.self = n
        this.isdead = false
    }

    is() {
        if (!this.isdead){
            this.grow();
            this.form();
        } else {
            this.dead()
        }
    }

    form() {
        let c = 255*this.growth
        let angle = TWO_PI / 6;
        fill(100,200,50,c)
        // stroke(this.stroke)
        noStroke()
        strokeWeight(this.strokeWeight);
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
        let sx = this.x + cos(a) * this.s;
        let sy = this.y + sin(a) * this.s;
        vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    dead(){
            let c = 255*this.growth
            let angle = TWO_PI / 6;
            fill(300,0,0,c)
            // stroke(this.stroke)
            noStroke()
            strokeWeight(this.strokeWeight);
            beginShape();
            for (let a = 0; a < TWO_PI; a += angle) {
            let sx = this.x + cos(a) * this.s;
            let sy = this.y + sin(a) * this.s;
            vertex(sx, sy);
            }
            endShape(CLOSE);
    }

    grow() {
        if (this.growthTime < 13 && this.growth < 1) {
            this.growthTime = this.growthTime + this.growthRate;
            this.growth = logistic(this.growthTime)
        }
        if (this.growthTime > 13 || this.growth > 1)  {
            this.growthTime = 13;
            this.growth = 1
        }
        if (this.growth <= .3) {
            this.isdead = true
        }
    }


    eat(rate) {
        if (this.growth > 0) {
            this.growthTime = this.growthTime - rate;
            this.growth = logistic(this.growthTime)

        }
    }
}