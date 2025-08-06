const gravity = 0.4;
const airResistance = 0.98;

function hsvToRgb(h, s, v) {
  let r, g, b;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

class Particle {
  constructor(x, y, hue, speed) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;

    var _angle = Math.random() * Math.PI * 2;
    this.velX = Math.cos(_angle) * speed;
    this.velY = Math.sin(_angle) * speed;
    // this.vel = p5.Vector.random2D().mult(random() * speed);

    // this.time = 0;
    this.time = 0;

    // colorMode(HSB);
    // this.color = color(c, 100, 100);
    this.hue = hue;
  }

  update() {
    // this.oldPos = createVector(this.pos.x, this.pos.y);
    // this.vel.mult(0.95);

    this.oldX = this.x;
    this.oldY = this.y;

    this.velX *= airResistance;
    this.velY *= airResistance;

    this.velY += gravity;

    // this.vel.y += this.gravity;

    this.time += 1 / 60;

    this.x += this.velX;
    this.y += this.velY;
  }

  //   draw() {
  //     stroke(this.color);
  //     strokeWeight(5);
  //     line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
  //   }

  draw() {
    var rgb = hsvToRgb(this.hue, 1, 1);
    ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.stroke();
  }
}
