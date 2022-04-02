let particles = [];

let allColours = [
  ["#FF0000", "#FFFF00", "#FFAA00"],
  ["#00FF00", "#00FFFF", "#0000FF"],
  ["#FF00AA", "#AA00FF", "#FF00FF"]
];

let count = 0;

//let sound;

//function preload() {
//sound = loadSound("Sound.wav");
//}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fireworkDisplay()
  strokeWeight(2);
  for (let i = particles.length - 1; i > 0; i--) {
    let particle = particles[i];
    particle.update();
    particle.draw();
    if (particle.isMinVel() || particle.isMaxTime()) {
      particles.splice(i, 1);
    }
  }
  count++;
}

function mousePressed() {
  //  sound.play();
  createFirework(mouseX, mouseY, floor(random(3)));
}

function createFirework(x, y, index) {
  for (let i = 0; i < 300; i++) {
    particles.push(new Particle(x, y, "#FF0000"));
  }
}

function fireworkDisplay() {
  if (count == 30) {
    createFirework(width / 3, height / 2, 0)
  }
}