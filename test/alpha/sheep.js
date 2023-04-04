var popSheep = []

class Sheep {
    constructor(x, y, r) {

        this.color = random(100, 255)

        this.pos = createVector(x, y)
        this.centroid = createVector(x, y)
        this.vel = createVector(random(width),random(height))
        // this.vel.heading = createVector(random(-1,1),random(-1,1))
        this.acc = createVector(0, 0)
        this.r = r;
        this.maxSpeed = 2
        this.faceing = this.vel.heading()
        this.maxForce = .75

        this.cRate = .1

        // in multiples of radius
        this.sight = 12

        // this.separation = 30

        this.isPanicked = false
        // this.isSeeking = false
        // this.isFleeing = false
        this.lastThreat = createVector(0, 0)

        this.nearestFood = 0
        this.nearestSheep = 0
        this.nearestSheepVelMag = 0
        // this.vel.setHeading(createVector(random(-1,1),random(-1,1)))

    }

    is() {
        // panicked state behavior
        if (this.isPanicked) {
            this.senceSheep();
            this.cluster();
            // this.separate();
            // this.move();

        } else {
            this.sence();
            this.motivation();
        }

        // basic existance
        this.update();
        this.form();
        this.reset()
    }

    sence() {
        if (! this.isGrazing) {
            this.senceFood()
        }
        this.senceFlock()
        this.senceSheep()
    }

    motivation() {
        this.flock();
        this.graze();
    }

    flock() {
        this.separate()
        this.cluster()
        // this.follow()
    }

    update() {
        // this.updateBio();
        this.updatePos();
    }

    form() {
        this.body()
        // this.stats()
    }

    updatePos() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxForce)
        this.pos.add(this.vel);
    }

    body() {
                // stroke(255);
        noStroke();
        // strokeWeight(2);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r)
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading())
        triangle(-this.r, -this.r /2, -this.r, this.r / 2, this.r, 0)
        pop()
    }

    stats() {
        strokeWeight(.5)
        stroke('rgb(255,0,0)')
        noFill()
        ellipse(this.pos.x, this.pos.y, this.r * this.sight)
    }

    reset() {
        this.acc.set(0,0);
        this.vel.setMag(.000000000000001)
        // this.isPanicked = false
    }

    senceFood() {
        let nearestD = 9999999999;
        for (let i = 0; i < field.length; i++) {
            let d = p5.Vector.dist(field[i].pos, this.pos)
            if (d < this.r * this.sight) {
                if (d < nearestD && field[i].growthTime > 10) {
                    this.nearestFood = i
                    nearestD = d
                }
            }
        }
        this.isGrazing = true
    }

    senceSheep() {
        let nearestD = 9999999999;
        for (let i = 0; i < popSheep.length; i++) {
            let d = p5.Vector.dist(popSheep[i].pos, this.pos)
            if (d < this.r * this.sight && d != 0) {
                if (d < nearestD) {
                    this.nearestSheep = i
                    // console.log(i)
                    nearestD = d
                    this.nearestSheepVelMag = popSheep[i].vel.mag()
                    // console.log(this.nearestSheepVelMag)
                }
            }
        }
    }

    senceFlock() {
        let length = popSheep.length
        let centroid = createVector(0, 0)

        for (let head of popSheep) {
            centroid.add(head.pos)
        }
        centroid.div(length)
        this.centroid = centroid
    }

    applyForce(force) {
        force.limit(this.maxForce);
        this.acc.add(force)
    }

    separate() {
        for (let head of popSheep) {
            let d = p5.Vector.dist(head.pos,this.pos)
            if (d < this.r * .5) {
                let force = p5.Vector.sub(head.pos,this.pos)
                force.normalize();
                force.setMag(this.r)
                head.pos.add(force)
                this.reset()
            }
        }
    }

    cluster() {
        let d = p5.Vector.dist(this.pos, popSheep[this.nearestSheep].pos)
        if (this.isPanicked) {
            this.seek(popSheep[this.nearestSheep].pos)
        }
        if (d > this.r * this.sight *.4 && !this.isPanicked) {
                this.isPanicked = true
                // this.seek(heard[this.nearestSheep].pos)
                console.log("cluster")
        } else if (d < this.r * this.sight *.2) {
            this.isPanicked = false
            }
        }

    // follow() {
    //     if (this.nearestSheepVelMag > .5) {

    //     }
    // }

    seek(target) {
        // this.isSeeking = true
        let d = p5.Vector.dist(this.pos,target)
        let force = p5.Vector.sub(target, this.pos);
        if (d > this.r) {
            force.setMag(this.maxSpeed);
            force.sub(this.vel);
            this.applyForce(force)
            // this.update()
        }
    }

    flee(target) {
        this.lastThreat = target
        let d = p5.Vector.dist(this.pos,this.lastThreat)
        let force = p5.Vector.sub(this.pos, this.lastThreat);
        if (d < this.r * 100) {
            force.setMag(this.maxSpeed);
            force.sub(this.vel);
            this.applyForce(force)
        } else {
            this.isFleeing = false
        }
    }


    graze() {
        // .0 - 1 point at wich food in a tile is depleated 
        let depleated = .2
        let d = p5.Vector.dist(this.pos, field[this.nearestFood].pos)
        this.seek(field[this.nearestFood].pos)
        // do not under any circumstances change this fucking nuymber
        if (d < this.r*2 && field[this.nearestFood].growth > depleated && this.isGrazing) {
            field[this.nearestFood].eat(this.cRate)
        } else {
            this.isGrazing = false
        }
    }
}

function newPopSheep(x,y,count,size) {
    for (let i = 0; i < count; i++) {
        popSheep.push(new Sheep(x + random(-(count/1)*size,(count/1)*size), y + random(-(count/1)*size,(count/1)*size), size))
    }
}