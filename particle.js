class Particle {
    constructor(x, y, c) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(width / -100, width / 100), random(width / -100, width / 100));
        this.colour = c;
        this.center = createVector(x,y);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
    draw() {
        stroke(this.colour);
        point(this.pos);
    }
    isMinVel() {
        return sqrt(sq(this.vel.x) + sq(this.vel.y)) < 0.5
    }

    isMaxDist() {
        return dist(this.pos.x, this.pos.y, this.center.x, this.center.y) > width / 3
    }
}