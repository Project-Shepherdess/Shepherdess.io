class Tile {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.pos = createVector(x,y)
        this.r = r
        this.growthTime = 12
        this.growth = 0
        // this.stroke = 0
        this.strokeWeight = 1
    }

    is() {
        this.grow();
        this.form();
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
        let sx = this.x + cos(a) * this.r;
        let sy = this.y + sin(a) * this.r;
        vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    grow() {
        if (this.growthTime < 13 && this.growth < 1) {
            this.growthTime = this.growthTime + .01;
            this.growth = logistic(this.growthTime)
        } else if (this.growthTime > 13 || this.growth > 1)  {
            this.growthTime = 13;
            this.growth = 1
        }
    }

    reap() {
        if (this.growthTime > -13 && this.growth > 0) {
            this.growthTime = this.growthTime -3;
            this.growth = logistic(this.growthTime)
        }
    }

    eat(rate) {
        if (this.growthTime > -13 && this.growth > 0) {
            this.growthTime = this.growthTime -rate;
            this.growth = logistic(this.growthTime)
        }
    }

    killit() {
        this.growthTime = 99
        this.growth = 0
    }
}

function fieldRect(x,y,h,w,s) {
  for (i = 0; i <= w ; i++) {
    for (ii = 1; ii <= h; ii++){
      field.push(new Tile(x + (ii*(s*3)), y + (i*(s*1.7555)), s));
    }
    for (ii = 1; ii <= h; ii++){
      field.push(new Tile((x + (s*1.5)) + (ii*(s*3)), (y+(s*.9)) + (i*(s*1.7555)), s));
    }
  }
}

function logistic(t) {
    return 1/(1+(Math.E**(t*-1)))
}