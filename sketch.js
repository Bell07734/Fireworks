let particles = [];

let allColours = [
  ["#FF0000", "#FFFF00", "#FFAA00"],
  ["#00FF00", "#00FFFF", "#0000FF"],
  ["#FF00AA", "#AA00FF", "#FF00FF"]
];

let count = 0;

let startButton, randomButton, buttons;
let display;
let colourIndex;
let buttonsAreHovered;
let rockets = [];

let sound;

function preload() {
  sound = loadSound("Sound.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = createButton("Start Display")
  startButton.mousePressed(startDisplay)
  startButton = new Button(10 * width / 50, 9 * height / 10, width / 5, height / 20, 200, 100, 100, "Start Display", 255, buttonPressed);
  randomButton = new Button(width / 2, 9 * height / 10, height / 20, height / 20, 255, 255, 255, "R", 0, setColour)
  orangeButton = new Button(5 * width / 8, 9 * height / 10, height / 20, height / 20, 255, 200, 0, "", 0, setColour, 0)
  greenButton = new Button(6 * width / 8, 9 * height / 10, height / 20, height / 20, 0, 200, 200, "", 0, setColour, 1)
  pinkButton = new Button(7 * width / 8, 9 * height / 10, height / 20, height / 20, 200, 0, 200, "", 0, setColour, 2)
  buttons = [startButton, randomButton, orangeButton, greenButton, pinkButton]
  colourIndex = -1
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
  for (let i = 0; i < rockets.length; i++) {
    let rocket = rockets[i]
    rocket.update()
    rocket.draw()
    if (rocket.isMinY()) {
      createFirework(rocket.x, rocket.y, rocket.index);
      rockets.splice(i, 1)
    }
  }
  buttonsAreHovered = false;
  for (let button of buttons) {
    if (button.isHovered()) {
      buttonsAreHovered = true;
      button.transparencyChange()
    } else {
      button.solidColour()
    }
    button.draw()
  }
}

function mousePressed() {
  if (!display && mouseY < height && !buttonsAreHovered) {
    if (colourIndex == -1) {
      createFirework(mouseX, mouseY, floor(random(3)));
    } else {
      createFirework(mouseX, mouseY, colourIndex);
    }
  }
  for (let button of buttons) {
    if (button.isHovered()) {
      button.buttonDown()
      button.function(button)
    }
  }
}

function mouseReleased() {
  for (let button of buttons) {
    button.buttonUp()
  }
}

function createFirework(x, y, index) {
  sound.play();
  let chosenColours = allColours[index];
  for (let i = 0; i < 300 / chosenColours.length; i++) {
    for (let j = 0; j < chosenColours.length; j++) {
      particles.push(new Particle(x, y, chosenColours[j]));
    }
  }
}

function fireworkDisplay() {
  if (count == 30) {
    rockets.push(new Rocket(width / 3, height, height / 2, "#FFAA00", 0))
  } else if (count == 40) {
    rockets.push(new Rocket(2 * width / 3, height, height / 2, "#01FFFF", 1))
  } else if (count == 70) {
    rockets.push(new Rocket(width / 5, height, height / 3, "#FF00FF", 2))
    rockets.push(new Rocket(4 * width / 5, height, height / 3, "#FF00FF", 2))
  } else if (count == 150) {
    stopDisplay()
  }
}

function buttonPressed() {
  if (display) {
    stopDisplay()
  } else {
    startDisplay()
  }
}

function startDisplay(button) {
  display = true;
  startButton.text = "Stop Display"
}

function stopDisplay(button) {
  display = false;
  count = 0;
  startButton.text = "Start Display"
}

function setColour(button) {
  if (randomButton.isHovered()) {
    colourIndex = -1
  } else {
    colourIndex = button.index
  }
}