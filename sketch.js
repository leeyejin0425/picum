let serial; // Serial port 객체
let portName = 'COM6'; // 아두이노가 연결된 포트
let joystickX = 0;
let joystickY = 0;
let buttonPressed = false;

function setup() {
  createCanvas(400, 400); // 캔버스 크기 설정
  serial = new p5.SerialPort(); // SerialPort 객체 생성
  serial.open(portName); // 아두이노 포트 열기
  serial.on('data', serialEvent); // 시리얼 데이터 수신 시 실행

  // 캔버스 초기화
  background(220);
}

function draw() {
  background(220);

  // 조이스틱 값으로 원 그리기
  fill(100, 150, 255);
  noStroke();
  ellipse(joystickX, joystickY, 50, 50);

  // 버튼 상태 표시
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(`Button: ${buttonPressed ? "Pressed" : "Released"}`, width / 2, height - 30);
}

function serialEvent() {
  let data = serial.readLine(); // 시리얼 데이터 읽기
  if (!data) return;

  let values = data.split(" "); // 데이터를 공백으로 분리
  if (values.length === 3) {
    joystickX = map(parseInt(values[0]), 0, 1023, 0, width); // X축 값 매핑
    joystickY = map(parseInt(values[1]), 0, 1023, 0, height); // Y축 값 매핑
    buttonPressed = parseInt(values[2]) === 0; // 버튼 상태 확인
  }
}

