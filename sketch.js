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

//let sound;

//function preload() {
//  sound = loadSound("Sound.wav");
//}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // startButton = createButton("Start Display")
  // startButton.mousePressed(startDisplay)
  startButton = new Button(10 * width / 50, 9 * height / 10, width / 5, height / 20, 200, 100, 100, "Start Display", buttonPressed);
  randomButton = new Button(width / 2, 9 * height / 10, height / 20, height / 20, 255, 255, 255, "R", setColour)
  orangeButton = new Button(5 * width / 8, 9 * height / 10, height / 20, height / 20, 255, 200, 0, "", setColour, 0)
  greenButton = new Button(6 * width / 8, 9 * height / 10, height / 20, height / 20, 0, 200, 200, "", setColour, 1)
  pinkButton = new Button(7 * width / 8, 9 * height / 10, height / 20, height / 20, 200, 0, 200, "", setColour, 2)
  buttons = [startButton, randomButton, orangeButton, greenButton, pinkButton]
  colourIndex = floor(random(3))
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
  for (let button of buttons) {
    if (button.isHovered()) {
      button.transparencyChange()
    } else {
      button.solidColour()
    }
    button.draw()
  }
}

function mousePressed() {
  if (!display && mouseY < height && !startButton.isHovered()) {
    //sound.play();
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
  } else if (count > 170) {
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