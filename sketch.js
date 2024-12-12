function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvas-container");
}

function draw() {
  background(220);
  fill(100, 150, 255);
  noStroke();
  ellipse(mouseX, mouseY, 50, 50);
}

function startEmotone() {
  alert("Starting Emotone Finder...");
} 

