class Particle {
    constructor(x, y, c) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(width / random(100,200));
        this.gravity = createVector(0,0.1);
        this.center = createVector(x, y);

        this.colour = c;

        this.minVel = random(0.5,3);
        this.maxTime = random(30,70);
        this.time = 0;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.gravity);
        this.vel.mult(0.95);
        this.time ++;
    }
    draw() {
        stroke(this.colour);
        point(this.pos);
    }
    isMinVel() {
        return sqrt(sq(this.vel.x) + sq(this.vel.y)) < this.minVel;
    }

    isMaxTime() {
        return this.time >= this.maxTime;
    }
}