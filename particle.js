class Particle {
    constructor(x, y, c) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(width / random(100,200))
        this.colour = c;
        this.center = createVector(x, y);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.mult(0.95);
    }
    draw() {
        stroke(this.colour);
        point(this.pos);
    }
    isMinVel() {
        return sqrt(sq(this.vel.x) + sq(this.vel.y)) < 2
    }

    isMaxDist() {
        return dist(this.pos.x, this.pos.y, this.center.x, this.center.y) > width / random(1,5)
    }
}