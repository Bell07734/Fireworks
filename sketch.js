let particles = [];

//let sound;

//function preload() {
  //sound = loadSound("Sound.wav");
//}

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
    if (particle.isMinVel() || particle.isMaxTime()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
//  sound.play();
  createFireworks(mouseX, mouseY);
}

function createFireworks(x, y) {
  let rand = floor(random(3));
  for (let i = 0; i < 100; i++) {
    if (rand == 0) {
      particles.push(new Particle(x, y, "#FF0000"));
      particles.push(new Particle(x, y, "#FFFF00"));
      particles.push(new Particle(x, y, "#FFAA00"));
    } else if (rand == 1) {
      particles.push(new Particle(x, y, "#00FF00"));
      particles.push(new Particle(x, y, "#00FFFF"));
      particles.push(new Particle(x, y, "#0000FF"));
    } else {
      particles.push(new Particle(x, y, "#FF00AA"));
      particles.push(new Particle(x, y, "#AA00FF"));
      particles.push(new Particle(x, y, "#FF00FF"));
    }
  }
}
