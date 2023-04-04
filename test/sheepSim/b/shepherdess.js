var myWorks = []

function shepherdessIs(pop) {
    var locList = []

    for (let sheep of pop) {
        locList.push(sheep.pos)
    }

    // console.log(locList)
    ozimandius(locList)
}

function ozimandius(population) {
    // population = [a, b, c, d]
    // myWorks = []

    // population = [b, c, d]
    // myWorks = [[a]]

    //               ?  ?  ?
    // population = [b, c, d]
    // myWorks = [[a]]

    //               y  n  n
    // population = [b, c, d]
    // myWorks = [[a]]

    // population = [c, d]
    // myWorks = [[a, b]]

    //               ?  ?
    // population = [c, d]
    // myWorks = [[a, b]]

    //               n  n
    // population = [c, d]
    // myWorks = [[a, b]]

    // population = [d]
    // myWorks = [[c], [a, b]]

    //               ?
    // population = [d]
    // myWorks = [[c], [a, b]]

    //               n
    // population = [d]
    // myWorks = [[c], [a, b]]

    // population = []
    // myWorks = [[d], [c], [a, b]]

    // len(population) == 0 -> EXIT

    function closeAny(vector, current_chain) {
        var isClose = false;
        for (chain_member of current_chain) {
            isClose = vector.dist(chain_member) <= threshold;
        }
        return isClose;
    }

    myWorks.length = 0;
    var threshold = sheepPop[0].maxSight;
    // var threshold = 10 *2

    // Initialize the first chain with a point.
    // Move population[0] -> myWorks[0][0]
    myWorks.unshift([population.shift()]); // removes item from begining of population and adds it to beginign of my works

    // Until every member is assigned to a chain.
    while (population.length > 0) {
        // unshift = Specify a new chain.
        // shift = Remove a population member.

        // We set the convention that the current chain always at position 0. (tldr assert dominance)
        var current_chain = myWorks[0]

        // Find the population member indices that are close enough.
        var close_population = [];
        for (index in population) {
            if (closeAny(population[index], current_chain)) {
                close_population.push(index);
            }
        }

        // Make a new chain if no members of the population are close enough to any
        // member(s) of the current chain.
        if (close_population.length == 0)
            myWorks.unshift([population.shift()])

        // Add close members if they exist.
        else if (close_population.length > 0) {
            // Add to the current chain.
            for (index of close_population) {
                myWorks[0].push(population[index])
            }

            // Delete from the population once added to the current chain.
            for (var i = close_population.length - 1; i >= 0; i--) {
                population.splice(close_population[i], 1);
            }
        }
    }
    // console.log(myWorks)
    for (let herd of myWorks) {
        if (herd.length > 1) {
            bound(herd)
        }
    }
}

function bound(herd) {
    // console.log(herd)
    // let red = random(255); // r is a random number between 0 - 255
    // let green = random(100,200); // g is a random number betwen 100 - 200
    // let blue = random(100); // b is a random number between 0 - 100
    // let a = random(200,255); // a is a random number between 200 - 255

    let sum = createVector(0, 0);
    for (let member of herd) {
        sum.add(member)
    }
    let centroid = sum.div(herd.length)

    let rectLeft = 0
    let rectTop = 0
    let rectRight = 0
    let rectBottom = 0
    let max = 0;
    let boundRRunner = 0
    let boundBRunner = 0
    let boundLRunner = 0
    let boundTRunner = 0

    for (let member of herd) {
        let d = centroid.dist(member)
        let dd = p5.Vector.sub(centroid, member)
        let x = member.x
        let y = member.y
        if (d > max) {
            max = d
        }
        if (dd.x > 0 && dd.x > boundTRunner) {
            rectLeft = x
            boundTRunner = dd.x
        }
        if (dd.y > 0 && dd.y > boundRRunner) {
            rectTop = y
            boundRRunner = dd.y
        }
        if (dd.x < 0 && dd.x < boundBRunner) {
            rectRight = x
            boundBRunner = dd.x
        }
        if (dd.y < 0 && dd.y < boundLRunner) {
            rectBottom = y
            boundLRunner = dd.y
        }
    }

    let buff = 10
    // color(red, green, blue, a)
    noFill();
    stroke(255)
    strokeWeight(3)
    beginShape();
    vertex(rectLeft - buff, rectTop - buff);
    vertex(rectRight + buff, rectTop - buff);
    vertex(rectRight + buff, rectBottom + buff);
    vertex(rectLeft - buff, rectBottom + buff);
    endShape(CLOSE);

    // ellipse(centroid.x, centroid.y, max*2)
    for (sheep of herd) {
        fill(255,0,0,255)
        textSize(sheepPop[0].size);
        text(String(herd.length), sheep.x - sheepPop[0].size / 3, sheep.y + sheepPop[0].size / 2);
    }
    // fill(255, 0, 0, 255)
    // textSize(sheepPop[0].size);
    // // text(String(herd.length), (rectRight + rectLeft) / 2, (rectTop + rectBottom) / 2)
    // text("Sub-HerdID " + String(herd.length), rectLeft - buff, rectTop-buff)
}

function spook(x=mouseX,y=mouseY,w=30) {
    let pos = createVector(x,y)
    let stop = 7
    ellipse(x,y,w/3)
    fill(0,0,0,0)
    ellipse(x,y,w)
    ellipse(x,y,w*stop)
    for (let member of sheepPop) {
        if (p5.Vector.dist(pos,member.pos)<=w/2 && keyIsDown(32)){
            member.spooked = true
            member.spook = pos
            // console.log(member.spooked)
            // console.log("dicks")
        }
        if (p5.Vector.dist(pos,member.pos)>=(w*stop)/2 && member.spooked==true || !keyIsDown(32)){
            member.spooked = false
            // console.log(member.spooked)
        }
    }
}

function contain(x=mouseX,y=mouseY,w=20) {
    let pos = createVector(x,y)
    let inBound = (w*7)*.9
    let bound = w*7
    ellipse(x,y,w/3)
    fill(0,0,0,0)
    ellipse(x,y,inBound)
    ellipse(x,y,bound)
    for (let member of sheepPop) {
        let dist = p5.Vector.dist(pos,member.pos)

        if (dist<=inBound/2){
            member.contained = true
            member.container = pos
            member.containerBound = bound/2
        } else {
            member.contained = false
        }
        if (dist<=bound/2 && dist>=inBound/2 && member.contained == false){
            member.lured = true
            member.lure = pos
            // console.log(member.spooked)
            // console.log("dicks")
        }
        if (((dist<=(inBound)/2 || dist>=(bound)/2) && member.lured==true)|| member.contained){
            member.lured = false
            // console.log(member.spooked)
        }
        if (keyIsDown(32) && member.contained){
            member.lured = true
            member.lure = pos
        }
    }
}