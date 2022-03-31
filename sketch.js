let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  particles.push(new Particle(width / 2, height / 2, "#FF0000"))
  particles.push(new Particle(width / 2, height / 2, "#00FF00"))
  particles.push(new Particle(width / 2, height / 2, "#0000FF"))
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