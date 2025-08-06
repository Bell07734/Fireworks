const canvas = document.getElementById("cnvs");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Initial sizing
resizeCanvas();

// Resize on window change
window.addEventListener("resize", resizeCanvas);

var particles = [];

function firework(x, y) {
  let hue = Math.random();
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle(x, y, hue, 5 * Math.random() ** (1 / 3)));
    hue += 0.001;
    hue = hue % 1;
  }
}

function init() {
  firework(200, 200);
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
  window.requestAnimationFrame(draw);
}
init();

canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  firework(x, y);
});
