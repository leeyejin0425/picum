let serial; // Serial port 객체
let joystickX = 512; // 조이스틱 X축 초기값
let joystickY = 512; // 조이스틱 Y축 초기값
let buttonState = 1; // 버튼 상태 (1: Released, 0: Pressed)
let cursorX, cursorY; // 화면 상의 커서 위치
let smoothingFactor = 0.05; // 부드러운 이동 비율
let wasPressed = false; // 버튼이 눌린 상태를 추적

function setup() {
  // 캔버스를 브라우저 전체 크기로 생성하고 상단에 위치
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style("pointer-events", "none"); // 캔버스가 DOM 클릭을 방해하지 않음

  cursorX = width / 2;
  cursorY = height / 2;

  // Serial 객체 생성 및 초기화
  serial = new p5.SerialPort();

  // Serial 포트 연결
  serial.open("COM6"); // 포트 이름을 아두이노 포트에 맞게 설정

  // Serial 이벤트 리스너 설정
  serial.on("data", serialEvent); // 데이터 수신 이벤트
  serial.on("error", serialError); // 에러 발생 이벤트

  noCursor(); // 기본 마우스 커서 숨기기
}

function draw() {
  clear(); // 캔버스를 투명하게 유지

  // 조이스틱 데이터로 목표 위치 계산
  let targetX = map(joystickX, 0, 1023, 0, width);
  let targetY = map(joystickY, 0, 1023, 0, height);

  // 부드러운 이동 적용
  cursorX += (targetX - cursorX) * smoothingFactor;
  cursorY += (targetY - cursorY) * smoothingFactor;

  // 경계 제한
  cursorX = constrain(cursorX, 0, width);
  cursorY = constrain(cursorY, 0, height);

  // 커서 그리기
  fill(0, 150, 255);
  noStroke();
  ellipse(cursorX, cursorY, 20, 20);

  // 버튼 상태 확인 및 DOM 클릭 처리
  if (buttonState === 0 && !wasPressed) {
    wasPressed = true; // 버튼이 눌린 상태로 변경
    simulateMouseClick(cursorX, cursorY);
  } else if (buttonState === 1) {
    wasPressed = false; // 버튼이 떼어진 상태로 변경
  }
}

function serialEvent() {
  let data = serial.readLine(); // 데이터 한 줄 읽기
  if (data) {
    console.log("Data received:", data); // 디버깅용 출력
    let values = data.trim().split(" ");
    if (values.length === 3) {
      joystickX = int(values[0]); // X축 값
      joystickY = int(values[1]); // Y축 값
      buttonState = int(values[2]); // 버튼 상태 (0: Pressed, 1: Released)
    }
  }
}

function serialError(err) {
  console.error("Serial port error:", err);
}

// DOM 요소 클릭 이벤트 시뮬레이션
function simulateMouseClick(x, y) {
  let element = document.elementFromPoint(x, y); // 커서 위치의 DOM 요소 가져오기
  if (element && typeof element.click === "function") {
    element.click();
    console.log(`Clicked on: ${element.tagName}`);
  }
}






