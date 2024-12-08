function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
  }
  
  function draw() {
    background(240);
  
    fill(100, 150, 255);
    noStroke();
    ellipse(mouseX, mouseY, 50, 50);
  
    fill(0);
    textSize(18);
    textAlign(CENTER);
    text('Move your mouse!', width / 2, height / 2);
  }
  