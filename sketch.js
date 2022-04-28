//
// ---SETUP---
//

let particles = [];

let allColours = [
  ["#FF0000", "#FFFF00", "#FFAA00"],
  ["#00FF00", "#00FFFF", "#0000FF"],
  ["#FF00AA", "#AA00FF", "#FF00FF"]
];

let count = 0;

let startButton, randomButton, orangeButton, greenButton, pinkButton, helpButton, muteButton, buttons;
let display;
let colourIndex;
let buttonsAreHovered;
let rockets = [];

let sound;
let soundOn = true;

function preload() {
  sound = loadSound("Sound.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = new Button(10 * width / 50, 9 * height / 10, width / 5, height / 20, 200, 100, 100, "Start Display", 255, startButtonPressed);
  randomButton = new Button(width / 2, 9 * height / 10, height / 20, height / 20, 255, 255, 255, "0", 0, setColour);
  orangeButton = new Button(5 * width / 8, 9 * height / 10, height / 20, height / 20, 255, 200, 0, "1", 0, setColour, 0);
  greenButton = new Button(6 * width / 8, 9 * height / 10, height / 20, height / 20, 0, 200, 200, "2", 0, setColour, 1);
  pinkButton = new Button(7 * width / 8, 9 * height / 10, height / 20, height / 20, 200, 0, 200, "3", 0, setColour, 2);
  helpButton = new Button(width - height / 10, height / 10, height / 20, height / 20, 26, 115, 255, "?", 255, instructions);
  muteButton = new Button(height / 10, height / 10, height / 20, height / 20, 26, 115, 255, "🔈", 0, muteButtonPressed);
  buttons = [startButton, randomButton, orangeButton, greenButton, pinkButton, helpButton, muteButton];
  colourIndex = -1;
}


//
// MAIN LOOP
//

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
    let rocket = rockets[i];
    rocket.update();
    rocket.draw();
    if (rocket.isMinY()) {
      createFirework(rocket.x, rocket.y, rocket.index);
      rockets.splice(i, 1);
    }
  }
  buttonsAreHovered = false;
  for (let button of buttons) {
    if (button.isHovered()) {
      buttonsAreHovered = true;
      button.transparencyChange();
    } else {
      button.solidColour();
    }
    button.draw();
  }
}

//
// FUNCTIONS
//

function mousePressed() {
  if (!display && !buttonsAreHovered) {
    if (colourIndex == -1) {
      createFirework(mouseX, mouseY, floor(random(3)));
    } else {
      createFirework(mouseX, mouseY, colourIndex);
    }
  }
  for (let button of buttons) {
    if (button.isHovered()) {
      button.buttonDown();
      button.function(button);
    }
  }
}

function mouseReleased() {
  for (let button of buttons) {
    button.buttonUp();
  }
}

function startButtonPressed() {
  if (display) {
    stopDisplay();
  } else {
    startDisplay();
  }
}

function startDisplay(button) {
  display = true;
  startButton.text = "Stop Display";
}

function stopDisplay(button) {
  display = false;
  count = 0;
  startButton.text = "Start Display";
}

function setColour(button) {
  if (randomButton.isHovered()) {
    colourIndex = -1;
  } else {
    colourIndex = button.index;
  }
}

function instructions() {
  alert("INSTRUCTIONS\n•Click on the screen to make fireworks\n•Press the different buttons to switch colours\n•Or start a firework at the mouse by pressing the corrresponding keys:\n   Random - 0 or R\n   Green - 1\n   Orange - 2\n   Pink - 3\n•You can also watch a preprogrammed display by pressing the start display button");
}

function muteButtonPressed() {
  if (soundOn) {
    mute();
  } else {
    unmute();
  }
}

function mute() {
  muteButton.text = "🔊";
  soundOn = false;
}

function unmute() {
  muteButton.text = "🔈";
  soundOn = true;
}

function keyPressed() {
  if (!display && !buttonsAreHovered) {
    if (key == 0 || key == "R" || key == "r") {
      colourIndex = -1;
      createFirework(mouseX, mouseY, floor(random(3)));
    } else if (key == 1 || key == 2 || key == 3) {
      colourIndex = key - 1;
      createFirework(mouseX, mouseY, colourIndex);
    }
  }
}

function createFirework(x, y, index) {
  if (soundOn) {
    sound.play();
  }
  let chosenColours = allColours[index];
  for (let i = 0; i < 450 / chosenColours.length; i++) {
    for (let j = 0; j < chosenColours.length; j++) {
      particles.push(new Particle(x, y, chosenColours[j]));
    }
  }
}

function fireworkDisplay() {
  if (count == 30) {
    rockets.push(new Rocket(width / 3, height, height / 2, "#FFAA00", 0));
  } else if (count == 40) {
    rockets.push(new Rocket(2 * width / 3, height, height / 2, "#00FFFF", 1));
  } else if (count == 70) {
    rockets.push(new Rocket(width / 5, height, height / 3, "#FF00FF", 2));
    rockets.push(new Rocket(4 * width / 5, height, height / 3, "#FF00FF", 2));
  } else if (count == 150) {
    rockets.push(new Rocket(width / 2, height, height / 2, "#FFAA00", 0));
  } else if (count == 180) {
    rockets.push(new Rocket(width / 3, height, 2 * height / 3, "#00FFFF", 1));
    rockets.push(new Rocket(2 * width / 3, height, 2 * height / 3, "#00FFFF", 1));
  } else if (count == 210) {
    rockets.push(new Rocket(width / 2, height, height / 3, "#FF00FF", 2));
  } else if (count == 270) {
    rockets.push(new Rocket(width / 3, height, 2 * height / 3, "#FFAA00", 0));
    rockets.push(new Rocket(2 * width / 3, height, 2 * height / 3, "#FFAA00", 0));
  } else if (count == 300) {
    rockets.push(new Rocket(2 * width / 5, height, height / 3, "#FF00FF", 2));
    rockets.push(new Rocket(3 * width / 5, height, height / 3, "#FF00FF", 2));
  } else if (count == 330) {
    rockets.push(new Rocket(width / 2, height, 2 * height / 3, "#FFAA00", 0));
    rockets.push(new Rocket(width / 2, height, height / 3, "#00FFFF", 1));
  } else if (count == 390) {
    rockets.push(new Rocket(width / 5, height, height / 2, "#FF00FF", 2));
  } else if (count == 405) {
    rockets.push(new Rocket(2 * width / 5, height, height / 2, "#FF00FF", 2));
  } else if (count == 420) {
    rockets.push(new Rocket(3 * width / 5, height, height / 2, "#FF00FF", 2));
  } else if (count == 435) {
    rockets.push(new Rocket(4 * width / 5, height, height / 2, "#FF00FF", 2));
  } else if (count == 480) {
    rockets.push(new Rocket(4 * width / 5, height, height / 2, "#00FFFF", 1));
  } else if (count == 495) {
    rockets.push(new Rocket(3 * width / 5, height, height / 2, "#00FFFF", 1));
  } else if (count == 510) {
    rockets.push(new Rocket(2 * width / 5, height, height / 2, "#00FFFF", 1));
  } else if (count == 525) {
    rockets.push(new Rocket(width / 5, height, height / 2, "#00FFFF", 1));
  } else if (count == 570) {
    rockets.push(new Rocket(width / 6, height, 2 * height / 3, "#FFAA00", 0));
    rockets.push(new Rocket(5 * width / 6, height, 2 * height / 3, "#FFAA00", 0));
  } else if (count == 585) {
    rockets.push(new Rocket(width / 3, height, height / 2, "#FF00FF", 2));
    rockets.push(new Rocket(2 * width / 3, height, height / 2, "#FF00FF", 2));
  } else if (count == 600) {
    rockets.push(new Rocket(width / 2, height, height / 3, "#00FFFF", 1));
  } else if (count == 660) {
    stopDisplay();
  }
}