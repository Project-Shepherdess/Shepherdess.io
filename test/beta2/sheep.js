function newSheepPop(x,y,h,s) {
    let spread = 100
    for (let i = 0; i < h; i++) {
        // sheepPop.push(new Sheep(random(x- width/spread, x+ width/spread), random(y- height/spread, y+ height/spread),s,i))
        // sheepPop.push(new Sheep(0,0,s,i))
        // sheepPop.push(new Sheep(width/2,height/2,s,i))
        sheepPop.push(new Sheep(random(border, width - border), random(border, height - border), s, i))
    }
}

class Sheep {
    constructor(x, y, r, id) {
        this.id = id

        // shepherdess flags
        this.spook = createVector(0,0)
        this.spooked = false

        // personal atributesw
        this.sep = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.pos = createVector(x, y);
        this.facing = this.vel.heading()

        this.r = r;
        this.color = (random(150,255))
        this.maxSpeed = 3;    // Maximum speed
        this.maxForce = 0.75; // Maximum steering force

        this.sight = this.r * 12
        this.reach = this.r * 1.25
        this.maxOkSeperation = this.sight * .7
        this.cRate = random(.01,.05)
        this.maxC = 1 // 0 / 1

        // psycological attributes
        this.isPanicked = false
        this.isEating = false
        this.isSeeking = false
        this.isSensingFood = true

        // social attributes
        this.nearestSheep = 0
            this.nearestSheepDistance = 0
            this.nearestSheepLocation = createVector(0,0)
        this.neighbors = []
        this.neighborsAvPos = createVector(0,0)

        // Social Flags
        this.leader = 0 //index of leader sheep
        this.following = false

        // environmental atrabutes
        this.nearestFood = false
            this.nearestFoodDistance = 0
            this.nearestFoodLocation = createVector(0,0)
        this.isFood = .4
        this.isFoodSubPrime = .7  
        this.isFoodPrime = 1  

        this.personalSpace = this.r

        // relational attributes
        this.atFood = false
        this.atFlock = false
        this.atNeighbor = false
    }

    applyForce(force) {
        this.acc.add(force)
    }

    seek(target) {
        let d = p5.Vector.dist(this.pos,target)
        let force = p5.Vector.sub(target, this.pos);
        if (d > this.r) {
            force.setMag(this.maxSpeed);
            force.sub(this.vel);
            this.applyForce(force);
            this.face(target)
            this.update()
        }
    }

    evade(target) {
        let d = p5.Vector.dist(target,this.pos)
        let force = p5.Vector.sub(this.pos,target);
        if (d > this.r) {
            force.setMag(this.maxSpeed);
            force.sub(this.vel);
            this.applyForce(force);
            this.faceAway(target)
            this.update()
        }
    }

    face(target) {
        let heading = p5.Vector.sub(target, this.pos);
        this.facing = heading.heading()
    }

    faceAway(target) {
        let heading = p5.Vector.sub(this.pos, target);
        this.facing = heading.heading()
    }

    is () {
        if (this.spooked){
            this.evade(this.spook)
            this.reset();
        }
        
        else if (this.following) {
            this.seek(this.nearestSheepLocation)
            console.log("following")
            this.reset();
            this.senseStampede()
        }
        
        else {
                   // identifying targets and other factors in environment
        this.sense();
        // evaluates sence factors and toggles behavioral modes
        this.motivation();
        // social behaviors based on modes
        this.social();
        // personal behaviors based on modes
        this.personal(); 
        }
        //physics and animation
        this.update();
        this.form();
        this.reset();
    }

        sense () {
            this.senseSheep()
            this.senseStampede()

            // // running closest measured field tile
            if (!this.isEating){
                // console.log("sensing")
                this.senseFood()
            }
            // this.senseFood()
            this.at()
        }

                senseSheep() {
                    let nearestSheepRunner = Infinity
                    let n = []
                    for (let i = 0; i < sheepPop.length; i++) {
                        let distance = p5.Vector.dist(this.pos,sheepPop[i].pos)

                        // find nearest sheep 
                        if (distance > 0 && distance < nearestSheepRunner){
                            this.nearestSheep = i
                            this.nearestSheepDistance = distance
                            nearestSheepRunner = distance
                            this.nearestSheepLocation = sheepPop[i].pos
                        }

                        // find neghbors
                        if (distance <= this.sight) {
                            n.push(i)
                        }

                    }
                    // update this.neighbors
                    if (n.length > 0){
                        this.neighbors = n
                    }
                }

                senseStampede(){
                    if (sheepPop[this.nearestSheep].spooked || sheepPop[this.nearestSheep].following) {
                        // this.leader = this.nearestSheepLocation
                        this.following = true
                    } else {
                        this.following = false
                    }
                    // if no neghbors spooked than stop following
                    let stamp = 0
                    for (let neighbor of this.neighbors) {
                        if (sheepPop[neighbor].spooked) {
                            stamp ++
                        }
                    }
                    if (stamp == 0 ) {
                        this.following = false
                    }
                }

                senseFood() {
                    let prime = []
                    let subPrime = []
                    let food = []
                    let nearestFieldRunner = Infinity;
                    // iterate over field tiles
                    for (let i = 0; i < field.length; i++) {
                        // measure distance between this and field tile
                        let d = p5.Vector.dist(field[i].pos, this.pos)

                        if (field[i].growth >= this.isFoodPrime && d <= this.sight /*&& dd < this.maxOkSeperation*/) {
                            prime.push(i)
                        } else if (field[i].growth >= this.isFoodSubPrime && d <= this.sight /*&& dd < this.maxOkSeperation*/) {
                            subPrime.push(i)
                        } else if (field[i].growth >= this.isFood && d <= this.sight /*&& dd < this.maxOkSeperation*/) {
                            food.push(i)
                        }
                    }

                    if (prime.length > 0) {
                        // console.log("prime")n
                        this.maxC = this.isFoodPrime * .66
                        for (let n of prime) {
                            let d = p5.Vector.dist(field[n].pos, this.pos)
                            if (d < nearestFieldRunner) {
                                // update the nearest field tile
                                this.nearestFood = n
                                // update running closest
                                nearestFieldRunner = d
                            }
                        }
                        // this.nearestGrass = prime[Math.floor(Math.random()*prime.length)]
                    } else if (subPrime.length > 0) {
                        // console.log("sub prime")
                        this.maxC = this.isFoodSubPrime * .66
                        for (let n of subPrime) {
                            let d = p5.Vector.dist(field[n].pos, this.pos)
                            if (d < nearestFieldRunner) {
                                // update the nearest field tile
                                this.nearestFood = n
                                // update running closest
                                nearestFieldRunner = d
                            }
                        }
                        // this.nearestGrass = subPrime[Math.floor(Math.random()*subPrime.length)]
                    } else if (food.length > 0) {
                        // console.log("food")
                        this.maxC = this.isFood *.66
                        for (let n of food) {
                            let d = p5.Vector.dist(field[n].pos, this.pos)
                            if (d < nearestFieldRunner) {
                                // update the nearest field tile
                                this.nearestFood = n
                                // update running closest
                                nearestFieldRunner = d
                            }
                        }
                    } 
             
                    this.nearestFoodLocation = field[this.nearestFood].pos
                    this.nearestFoodDistance = p5.Vector.dist(this.nearestFoodLocation, this.pos)
                }
                at () {
                    if (this.nearestSheepDistance <= this.personalSpace){
                        this.atNeighbor = true
                    } else {
                        this.atNeighbor = false
                    }
                    if (this.nearestFoodDistance <= this.reach){
                        this.atFood = true
                    } else {
                        this.atFood = false
                    }
                }
        
        motivation () {
            
        }

        social () {
            // this.cluster()
        }

        personal() {
            this.graze()
        }
            graze() {
                let d = p5.Vector.dist(this.pos, field[this.nearestFood].pos)

                if (this.atFood && field[this.nearestFood].growth > this.maxC){
                    // this.seek(this.nearestFoodLocation)
                    // console.log(field[this.nearestFood].growth)
                    this.isEating = true
                    // this.isSeeking = false
                    // this.face = p5.Vector.diff(field[this.nearestFood].pos, this.pos).heading()
                    field[this.nearestFood].eat(this.cRate)
                    this.face(this.nearestFoodLocation)

                    // let dd = p5.Vector.sub(field[this.nearestFood].pos, this.pos)
                    // this.facing = dd.heading()
                    // console.log("om")
                }else if (!this.atFood || field[this.nearestFood].growth <= this.maxC){
                    // console.log("not eating")
                    this.isEating = false
                }else {
                    this.isEating = false
                }


                if (!this.atFood) {
                    // console.log("seeking")
                    this.isSeeking = true
                    this.seek(this.nearestFoodLocation)
                    this.face(this.nearestFoodLocation)
                } else {
                    // console.log("not seeking")
                    this.isSeeking = false
                    // this.isEating = false
                }
            }
        
        update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxForce);
            this.pos.add(this.vel)

            this.physics()
        }

            physics(){
                // sheep collision
                if (this.nearestSheepDistance < this.personalSpace) {
                    let diff = p5.Vector.sub(this.pos, this.nearestSheepLocation)
                    diff.mult(.05)
                    this.pos.add(diff)
                    sheepPop[this.nearestSheep].pos.add(diff)
                }

                let boundryBuff = ts/2

                // fence
                let fenceX = 0 + border
                let fenceY = 0 + border + ts / 4
                let fenceWidth = width - border
                let fenceHeight = height - border - ts / 2

                if (this.pos.x >= fenceWidth - boundryBuff) {
                    this.pos.x = this.pos.x -1
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

        form() {
            this.body()
        }

            body() {
                noStroke();
                fill(this.color);
                ellipse(this.pos.x, this.pos.y, this.r)
                push();
                translate(this.pos.x, this.pos.y);
                rotate(this.facing)
                triangle(-this.r, -this.r /2, -this.r, this.r / 2, this.r, 0)
                pop()
                }

        reset() {
            this.acc.mult(0);
            this.vel.setMag(.000000000000001)
        }
    }