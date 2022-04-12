class Rocket {
    constructor(x, y, my, c, i) {
        this.x = x;
        this.y = y;
        this.velY = (y - my) / 20;
        this.minY = my;
        this.colour = c;
        this.index = i;
    }
    update() {
        this.y -= this.velY;
        this.velY *= 0.96;
    }
    isMinY() {
        return this.y <= this.minY;
    }
    draw() {
        strokeWeight(4);
        stroke(this.colour)
        point(this.x, this.y)
    }
}