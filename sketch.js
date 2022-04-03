let particles = [];

let allColours = [
  ["#FF0000", "#FFFF00", "#FFAA00"],
  ["#00FF00", "#00FFFF", "#0000FF"],
  ["#FF00AA", "#AA00FF", "#FF00FF"]
];

let count = 0;

let button, display;

//let sound;

//function preload() {
//  sound = loadSound("Sound.wav");
//}

function setup() {
  createCanvas(windowWidth, windowHeight - 50);
  button = createButton("Start Display")
  button.mousePressed(startDisplay)
}

function draw() {
  background(0);
  if (display) {
    fireworkDisplay();
    count++;
  }
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
  if (!display && mouseY < height) {
    //sound.play();
    createFirework(mouseX, mouseY, floor(random(3)));
  }
}

function createFirework(x, y, index) {
  let chosenColours = allColours[index];
  for (let i = 0; i < 300 / chosenColours.length; i++) {
    for (let j = 0; j < chosenColours.length; j++) {
      particles.push(new Particle(x, y, chosenColours[j]));
    }
  }
}

function fireworkDisplay() {
  if (count == 30) {
    createFirework(width / 3, height / 2, 0);
  } else if (count == 60) {
    createFirework(2 * width / 3, height / 2, 1);
  } else if (count == 90) {
    createFirework(width / 3, height / 2, 2);
  } else if (count == 120) {
    createFirework(2 * width / 3, height / 2, 1);
  } else if (count == 150) {
    createFirework(width / 3, height / 2, 1);
  } else if (count == 155) {
    createFirework(2 * width / 3, height / 2, 2);
  } else if (count == 160) {
    createFirework(width / 2, height / 3, 0);
  }
}

function startDisplay() {
  display = true;
  button.html("Stop Display");
  button.mousePressed(stopDisplay)
}

function stopDisplay() {
  display = false;
  button.html("Start Display")
  button.mousePressed(startDisplay)
  count = 0;
}