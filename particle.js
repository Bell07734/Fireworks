//
// PARTICLE
//

class Particle {
	constructor(x, y, c) {
		this.pos = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.vel.mult(height / random(75, 200));
		this.gravity = createVector(0, 0.075);
		this.center = createVector(x, y);
		this.weight = random(0.5, 2.5);

		this.colour = c;

		this.minVel = random(0.75, 2.5);
		this.maxTime = random(30, 100);
		this.time = 0;
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.gravity);
		this.vel.mult(0.94);
		this.time++;
	}
	draw() {
		stroke(this.colour);
		strokeWeight(this.weight);
		point(this.pos);
	}
	isMinVel() {
		return sqrt(sq(this.vel.x) + sq(this.vel.y)) < this.minVel;
	}

	isMaxTime() {
		return this.time >= this.maxTime;
	}
}
