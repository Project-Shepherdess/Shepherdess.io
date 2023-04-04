//Sheep object array
var sheepPop = []
//sheep object population initialization
function newSheepPop(x, y, h, s) {
    let spread = 100
    for (let i = 0; i < h; i++) {
        // sheepPop.push(new Sheep(random(x- width/spread, x+ width/spread), random(y- height/spread, y+ height/spread),s,i))
        // sheepPop.push(new Sheep(0,0,s,i))
        // sheepPop.push(new Sheep(width/2,height/2,s,i))
        sheepPop.push(new Sheep(random(border, width - border), random(border, height - border), s, i))
    }
}
//test sheep intialization
function testSheep(x, y, h, s) {
    sheepPop.push(new Sheep(random(border, width - border), random(border, height - border), s, 0))
}
//Sheep object population is function
function sheepPopIs() {
    for (let sheep of sheepPop) {
        sheep.is()
    }
}

class Sheep {
    constructor(x, y, r) {
        //meta physics
        this.noiseSeed = noiseSeed()
        this.noiseCount = 0
        this.mouse = createVector(mouseX, mouseY)
        //passive physics
        this.size = r * 2
        this.color = random(100, 200)
        this.reach = this.size
        this.speedMax = 1 // max distance traveled in a single frame
        this.accelerationRate = .01 //0-1
        this.decelerationRate = .01 //0-1
        this.turnMax = .03 // 0 - 3.14
        // this.cRate = .05
        this.maxSight = 70
        //active physics
        this.pos = createVector(x, y)
        this.velocity = createVector(x, y)
        this.speed = 0
        this.orientation = 0

        //behavioral constraints
        // this.accelerationFunction = //0-1
        // this.decelerationFunction = //0-1

        //knowledge
        this.food = []
        this.foodGrades = [1, .7, .4, .1]

        this.nearestFood = 0
        this.nearestFoodLocation = createVector(x, y)
        this.nearestFoodDistance = 0
        

        //behavior
        this.cRate = .05
        this.maxC = 0
        this.speedTarget = 0 //0 - 1
        this.accelerationTarget = 0
        this.faceTarget = this.velocity.heading()
        this.target = createVector(x, y)

        //flags
        this.eating = false
        this.moving = false
    }

    is() {
        this.metaPhysics()
        this.behavior()
        this.Physics()
        this.form()
    }

    
    metaPhysics() {
        this.noiseCount++
        this.mouse.set(mouseX, mouseY)
    }

    behavior() {
        this.graze()
    }


    locateFood() {

        this.food.length = 0
        for (let i = 0; i < field.length; i++) {
            if (p5.Vector.dist(field[i].pos, this.pos) <= this.maxSight) {
                this.food.push(i)
            }
        }


        let gradeA = []
        let gradeB = []
        let gradeC = []
        let nearestFieldRunner = Infinity;
        let nearestFoodTemp = false



        for (let member of this.food) {
            if (field[member].growth >= this.foodGrades[0]) {
                gradeA.push(member)
            } else if (field[member].growth >= this.foodGrades[1]) {
                gradeB.push(member)
            } else if (field[member].growth >= this.foodGrades[2]) {
                gradeC.push(member)
            }
        }


        if (gradeA.length > 0) {
            this.maxC = this.foodGrades[0 + 1]
            for (let n of gradeA) {
                let d = p5.Vector.dist(field[n].pos, this.pos)
                if (d < nearestFieldRunner) {
                    // update the nearest field tile
                    nearestFoodTemp = n
                    // update running closest
                    nearestFieldRunner = d
                }
            }
            // this.nearestGrass = prime[Math.floor(Math.random()*prime.length)]
        } else if (gradeB.length > 0) {
            this.maxC = this.foodGrades[1 + 1]
            for (let n of gradeB) {
                let d = p5.Vector.dist(field[n].pos, this.pos)
                if (d < nearestFieldRunner) {
                    // update the nearest field tile
                    nearestFoodTemp = n
                    // update running closest
                    nearestFieldRunner = d
                }
            }
            // this.nearestGrass = subPrime[Math.floor(Math.random()*subPrime.length)]
        } else if (gradeC.length > 0) {
            this.maxC = this.foodGrades[2 + 1]
            for (let n of gradeC) {
                let d = p5.Vector.dist(field[n].pos, this.pos)
                if (d < nearestFieldRunner) {
                    // update the nearest field tile
                    nearestFoodTemp = n
                    // update running closest
                    nearestFieldRunner = d
                }
            }
        }
        this.nearestFood = nearestFoodTemp
        if (this.nearestFood != false) {
            this.nearestFoodLocation = field[this.nearestFood].pos
            this.nearestFoodDistance = p5.Vector.dist(this.nearestFoodLocation, this.pos)
            this.nearestFoodDirection = p5.Vector.sub(this.nearestFoodLocation, this.pos).heading()
        }
        // console.log(this.nearestFoodDistance)
        // console.log(field[this.nearestFood].growth)
        // console.log(this.maxC + this.cRate)
    }

    graze() {

        this.face(this.target)

        if (!this.eating && !this.moving) {
            this.locateFood()
        }

        if (this.nearestFoodDistance > this.reach && !this.eating) {
            this.seek(this.nearestFoodLocation)
        }

        if (!this.moving) {
            this.eat(field[this.nearestFood])
        }
    }


    Physics() {
        // this.speed = this.speedMax * this.speedTarget
        this.velocity = p5.Vector.sub(this.target, this.pos);
        this.velocity.setMag(this.speed);
        this.pos = this.pos.add(this.velocity)

        this.fence()
    }

    fence() {
        let boundryBuff = ts / 2
        let fenceX = 0 + border
        let fenceY = 0 + border + ts / 4
        let fenceWidth = width - border
        let fenceHeight = height - border - ts / 2

        if (this.pos.x >= fenceWidth - boundryBuff) {
            this.pos.x = this.pos.x - 1
        }
        if (this.pos.y >= fenceHeight - boundryBuff) {
            this.pos.y = this.pos.y - 1
        }
        if (this.pos.x <= fenceX + boundryBuff) {
            this.pos.x = this.pos.x + 1
        }
        if (this.pos.y <= 0 + fenceY + boundryBuff) {
            this.pos.y = this.pos.y + 1
        }
    }

    // face() {

    // }

    form() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size)
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.orientation)
        triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0)
        pop()
    }

    accelerate(at = 1) {
        this.accelerationTarget = at
        if (this.speed < this.speedTarget) (
            this.speed = this.speed + (this.accelerationRate)
        )
        if (this.speed > this.speedTarget) (
            this.speed = this.speed - (this.decelerationRate)
        )

    }

    seek(target) {
        this.target.set(target.x, target.y)
        let targetDist = p5.Vector.dist(this.target, this.pos)
        this.face(this.target)
        if (targetDist > this.reach * 5) {
            this.moving = true
            this.speedTarget = 1
            this.accelerate(1)
        } else if (targetDist > this.reach) {
            this.moving = true
            this.speedTarget = .5
            this.accelerate(1)
        } else if (targetDist <= this.reach) {
            this.moving = false
            this.speedTarget = .0
            this.speed = 0
        }
    }

    face(target) {
        let angleBetween = (this.orientation - (p5.Vector.sub(target, this.pos).heading())).toPrecision(2)
        console.log(this.orientation)
        console.log(this.target)
        if (angleBetween < -.01){
            // this.orientation -= .01
        }
        else if (angleBetween > .01){
            // this.orientation += .01
        }
        else {
            this.orientation = p5.Vector.sub(target, this.pos).heading()
        }
        
        // this.faceTarget = p5.Vector.sub(target, this.pos).heading()
        // this.faceTarget = target.heading()
        // let angleBetween = this.target.angleBetween(target).toPrecision(2)
        // // console.log(angleBetween)
        // if (angleBetween > 0.00 && angleBetween >this.turnMax){
        //     // console.log("left")
        //     // this.orientation = (this.orientation + this.faceTarget)/2
        //     this.orientation = this.orientation + this.turnMax
        //     // console.log(this.orientation)
        //     }
        // else if (angleBetween < 0 && angleBetween < -this.turnMax){
        //     // console.log("right")
        //         // this.orientation = (this.orientation + this.faceTarget)/2
        //         this.orientation = this.orientation - this.turnMax
        //         // console.log(this.orientation)
        //     } else {
        //         this.orientation = this.faceTarget
        //     }
        // this.orientation = (p5.Vector.sub(target, this.pos).heading())
    }

    eat(target) {
        if (target.growth > this.maxC + this.cRate) {
            // console.log("omnom")
            this.eating = true
            this.face(target.pos)
            target.eat(this.cRate)
        }else if (this.eating) {
            this.eating = false
        }

    }
}