let serial;
let portName = 'COM6'; 
let joystickX = 512;
let joystickY = 512; 
let buttonPressed = false; 
let cursorX, cursorY; 
let smoothingFactor = 0.05;
let heartRate = 0; 
let isResultPage = false; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  serial = new p5.SerialPort(); 
  serial.open(portName); 
  serial.on('data', serialEvent); 

  cursorX = width / 2; 
  cursorY = height / 2;

  noCursor(); 
}

function draw() {
  clear(); 

 
  let targetX = map(joystickX, 0, 1023, 0, width);
  let targetY = map(joystickY, 0, 1023, 0, height + 200); 


  cursorX += (targetX - cursorX) * smoothingFactor;
  cursorY += (targetY - cursorY) * smoothingFactor;

  
  cursorX = constrain(cursorX, 0, width);
  cursorY = constrain(cursorY, 0, height);

 
  fill(0, 150, 255);
  noStroke();
  ellipse(cursorX, cursorY, 20, 20);

 
  if (buttonPressed) {
    simulateMouseClick(cursorX, cursorY);
  }

 
  if (isResultPage) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Heart Rate: ${heartRate}`, width / 2, height / 2);
  }
}


function simulateMouseClick(x, y) {
  const targetElement = document.elementFromPoint(x, y);
  if (targetElement) {
    targetElement.click(); 

  
    if (targetElement.tagName === "INPUT" && targetElement.type === "text") {
      targetElement.focus();
    }
  }
}


function serialEvent() {
  let data = serial.readLine();
  if (!data) return;

  let values = data.split(" ");
  if (values.length === 4) {
    joystickX = lerp(joystickX, parseInt(values[0]), 0.5); 
    joystickY = lerp(joystickY, parseInt(values[1]), 0.5);
    buttonPressed = parseInt(values[2]) === 0; 
    heartRate = parseInt(values[3]); 
  }
}








