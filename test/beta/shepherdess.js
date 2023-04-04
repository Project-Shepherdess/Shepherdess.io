var myWorks = []

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
    var threshold = sheepPop[0].sight/2;
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
        textSize(sheepPop[0].r);
        text(String(herd.length), sheep.x - sheepPop[0].r / 3, sheep.y + sheepPop[0].r / 2);
    }
    fill(255, 0, 0, 255)
    textSize(sheepPop[0].r);
    // text(String(herd.length), (rectRight + rectLeft) / 2, (rectTop + rectBottom) / 2)
    text("Sub-HerdID " + String(herd.length), rectLeft - buff, rectTop-buff)
}