class Button {
    constructor(x, y, w, h, r, g, b, t, f, i) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.width = w;
        this.height = h;
        this.r = r;
        this.g = g;
        this.b = b;
        this.color = color(this.r, this.g, this.b);
        this.text = t;
        this.function = f;
        this.index = i
    }

    isHovered() {
        return mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2
    }

    transparencyChange() {
        this.color = color(this.r, this.g, this.b, 100);
    }

    buttonDown() {
        this.y = this.oy + 2;
    }

    solidColour() {
        this.color = color(this.r, this.g, this.b);
    }
    buttonUp() {
        this.y = this.oy;
    }

    draw() {
        fill(this.color);
        rectMode(CENTER);
        stroke(255)
        rect(this.x, this.y, this.width, this.height, this.height / 4);
        textAlign(CENTER, CENTER);
        textSize(this.height / 2)
        fill(255);
        noStroke();
        text(this.text, this.x, this.y)
    }
}