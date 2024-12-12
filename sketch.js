let serial; // Serial port 객체
let portName = '/dev/ttyUSB0'; // 아두이노 포트 이름 (Windows: COM6)
let joystickX = 0;
let joystickY = 0;

function setup() {
  noCanvas(); // 캔버스 생성하지 않음
  serial = new p5.SerialPort(); // SerialPort 객체 생성
  serial.open(portName); // 포트 열기
  serial.on('data', serialEvent); // 데이터 수신 이벤트
}

function draw() {
  // 모든 페이지의 content 영역 이동
  let content = document.getElementById("content");
  if (content) {
    content.style.transform = `translate(${joystickX}px, ${joystickY}px)`;
  }
}

function serialEvent() {
  let data = serial.readLine(); // 시리얼 데이터 한 줄 읽기
  if (!data) return;

  let values = data.split(" "); // 데이터를 공백으로 나누기
  if (values.length === 3) {
    joystickX = map(parseInt(values[0]), 0, 1023, -200, 200); // X축 매핑
    joystickY = map(parseInt(values[1]), 0, 1023, -200, 200); // Y축 매핑
  }
}
