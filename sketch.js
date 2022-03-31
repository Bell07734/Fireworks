let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  strokeWeight(2);
  for (let i = particles.length - 1; i > 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.draw();
    if (particle.isMinVel() || particle.isMaxDist()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  createFireworks(mouseX, mouseY);
}

function createFireworks(x, y) {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y, "#FF0000"));
    particles.push(new Particle(x, y, "#FFFF00"));
    particles.push(new Particle(x, y, "#FFAA00"));
  }
}