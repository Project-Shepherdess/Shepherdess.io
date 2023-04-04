class Heard {
    constructor (x,y,r) {
        this.x = x
        this.y = y
        this.pos = createVector(x,y)
        this.r = r
        this.isManual = true
    }

    is () {
        if (this.isManual == true) {
            this.manual()
        }
        this.collect()
        this.form()
    }

    collect () {
        for (head of popSheep) {
            let d = p5.Vector.dist(head.pos,this.pos);
            if (d <= this.r/2 && d >= this.r/4){
                head.seek(this.pos);
                head.update()
                head.isPanicked = true
            } 
            if(d <= this.r/4){
                head.isPanicked = false
            }
        }
    }

    manual () {
        this.pos.set(mouseX,mouseY)
    }

    form () {
        noFill()
        stroke(255)
        strokeWeight(3)
        ellipse(this.pos.x, this.pos.y, this.r)
    }

}