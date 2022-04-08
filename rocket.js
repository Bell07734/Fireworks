class Rocket {
    constructor(x, y, my, c, i) {
        this.x = x;
        this.y = y;
        this.velY = 25;
        this.minY = my;
        this.colour = c;
        this.index = i;
    }
    update() {
        this.y -= this.velY;
        this.velY *= 0.95;
    }
    isMinY() {
        console.log(this.y, this.minY)
        return this.y <= this.minY;
    }
    draw() {
        strokeWeight(4);
        stroke(this.colour)
        point(this.x, this.y)
    }
}