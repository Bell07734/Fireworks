//
//ROCKET
//

class Rocket {
	constructor(x, y, my, c, i) {
		this.x = x;
		this.y = y;
		this.velY = (y - my) / 20;
		this.minY = my;
		this.colour = c;
		this.index = i;

		this.oldX = x;
		this.oldY = y;
	}
	update() {
		this.oldX = this.x;
		this.oldY = this.y;

		this.y -= this.velY;
		this.velY *= 0.96;
	}
	isMinY() {
		return this.y <= this.minY;
	}
	draw() {
		strokeWeight(4);
		stroke(this.colour);
		line(this.x, this.y, this.oldX, this.oldY);
	}
}
