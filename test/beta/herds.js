// var herds = []
function sort() {
    let x = []
    for (sheep of sheepPop) {

    }
}

function newHerd() {
   herds.push(new Herd(0,0,20))
}

class Herd {
    constructor (x,y,r) {
        this.herds = []
        this.x = x
        this.y = y
        this.r = r
        this.centroid = createVector(0,0)
        this.rectT = 0
        this.rectR = 0
        this.rectB = 0
        this.rectL = 0
    }

    is () {
        this.populate()
        this.locate()
        this.bound()
        this.bb()
        this.update()
        this.form()
        // console.log("form")
    }

    populate() {
        let newHerd =
        for (let sheep of sheepPop) {
            this.members.push(sheep.pos)
        }
    }

    locate () {
        let sum = createVector(0,0);
        for (let member of this.members) {
            sum.add(member)
        }
        this.centroid = sum.div(this.members.length)
    }

    bound () {
        let max = 0;
        let boundRRunner = 0
        let boundBRunner = 0
        let boundLRunner = 0
        let boundTRunner = 0

        for (let member of this.members){
            let d = this.centroid.dist(member)
            let dd = p5.Vector.sub(this.centroid, member)
            let x = member.x
            let y = member.y
            if (d > max) {
                max = d
            }
            if (dd.x > 0 && dd.x > boundTRunner) {
                this.rectT = x
                boundTRunner = dd.x
            }
            if (dd.y > 0 && dd.y > boundRRunner){
                this.rectR = y
                boundRRunner = dd.y
            }
            if (dd.x < 0 && dd.x < boundBRunner){
                this.rectB = x
                boundBRunner = dd.x
            }
            if (dd.y < 0 && dd.y < boundLRunner){
                this.rectL = y
                boundLRunner = dd.y
            }
        }
        this.r = max*2


        console.log(this.rectL)

    }

    update () {
        this.x = mouseX
        this.y = mouseY
    }

    form () {
        let buff = 0
        noFill()
        stroke(255)
        strokeWeight(3)
    }

    bb() {
        let buff = 10
        noFill();
        stroke(255)
        strokeWeight(3)
        beginShape();
        vertex(this.rectT -buff, this.rectR -buff);
        vertex(this.rectB +buff, this.rectR -buff);
        vertex(this.rectB +buff, this.rectL +buff);
        vertex(this.rectT -buff, this.rectL +buff);
        endShape(CLOSE);
    }

}