let serial; // Serial port 객체
let portName = 'COM6'; // 아두이노가 연결된 포트
let joystickX = 512; // 조이스틱 X축 초기값
let joystickY = 512; // 조이스틱 Y축 초기값
let buttonPressed = false; // 버튼 상태 추적
let cursorX, cursorY; // 화면 상의 커서 위치
let smoothingFactor = 0.05; // 커서 이동 보정 비율
let heartRate = 0; // 심박수 데이터
let isResultPage = false; // 현재 페이지가 결과 페이지인지 확인

function setup() {
  createCanvas(windowWidth, windowHeight); // 캔버스를 전체 화면으로 생성
  serial = new p5.SerialPort(); // SerialPort 객체 생성
  serial.open(portName); // 아두이노 포트 열기
  serial.on('data', serialEvent); // 시리얼 데이터 수신 시 실행

  cursorX = width / 2; // 커서 초기 위치 (화면 중앙)
  cursorY = height / 2;

  noCursor(); // 기본 마우스 커서 숨기기
}

function draw() {
  clear(); // 캔버스를 투명하게 유지

  // 조이스틱 입력값으로 목표 위치 계산
  let targetX = map(joystickX, 0, 1023, 0, width);
  let targetY = map(joystickY, 0, 1023, 0, height + 200); // **하단 이동 범위 확장**

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

  // 버튼 상태에 따라 DOM 클릭 시뮬레이션
  if (buttonPressed) {
    simulateMouseClick(cursorX, cursorY);
  }

  // 결과 페이지에서 하트레이트 값을 표시
  if (isResultPage) {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Heart Rate: ${heartRate}`, width / 2, height / 2);
  }
}

// DOM 클릭 이벤트 시뮬레이션
function simulateMouseClick(x, y) {
  const targetElement = document.elementFromPoint(x, y); // 해당 좌표의 DOM 요소 찾기
  if (targetElement) {
    targetElement.click(); // DOM 요소 클릭 실행

    // 텍스트 입력창 클릭 시 자동 포커스
    if (targetElement.tagName === "INPUT" && targetElement.type === "text") {
      targetElement.focus(); // 텍스트 입력창에 포커스
    }
  }
}

// 시리얼 데이터 처리
function serialEvent() {
  let data = serial.readLine(); // 시리얼 데이터 읽기
  if (!data) return;

  let values = data.split(" "); // 데이터를 공백으로 분리
  if (values.length === 4) {
    joystickX = lerp(joystickX, parseInt(values[0]), 0.5); // X축 값, 천천히 변화
    joystickY = lerp(joystickY, parseInt(values[1]), 0.5);
    buttonPressed = parseInt(values[2]) === 0; // 버튼 상태 확인
    heartRate = parseInt(values[3]); // 심박수 데이터
  }
}








