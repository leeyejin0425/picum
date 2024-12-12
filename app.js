// 페이지 콘텐츠 데이터



const pages = {
  main: `
  <div class="container">
    <h1>나만의 Emotone</h1>
    <p>Emotone은 감정을 색상과 소리로 표현하는 창의적인 시스템입니다.</p>
    <button id="explore-button" onclick="navigate('name-input')">나만의 Emotone 탐색하기</button>
  </div>
`,
about: `
  <div class="container">
    <h1>About Emotone</h1>
    <p>Emotone은 감정을 분석하고, 이를 색상과 소리로 변환하는 창의적인 시스템입니다.</p>
  </div>
`,
how: `
  <div class="container">
    <h1>How Emotone Works</h1>
    <p>Emotone은 입력된 데이터를 기반으로 고유한 색상과 사운드를 생성합니다.</p>
  </div>
  `,
  "name-input": `
    <div class="container">
      <h1>당신의 이름을 알려주세요</h1>
      <input type="text" id="name-input" placeholder="이름을 입력하세요" maxlength="20">
      <button id="next-button" onclick="handleNameInput()">다음</button>
    </div>
  `,
  "how-to-play": `
    <div class="container">
      <h1>How to Play?</h1>
      <div class="image-section">
        <img src="free-icon-conversation-1253376.png" alt="Discussion Icon">
        <img src="free-icon-home-repair-4072135.png" alt="Home Repair Icon">
        <img src="free-icon-photo-2984403.png" alt="Photo Icon">
      </div>
      <p class="description">
        준비가 되었다면 엄지손가락을 센서 위에 올려주세요.
      </p>
      <button class="explore-btn" onclick="navigate('measuring')">측정 시작</button>
    </div>
  `,
  measuring: `
    <div class="container">
      <h1>측정 중...</h1>
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
    </div>
  `,
  result: `
    <div class="container">
      <h1 id="result-title"></h1>
      <div class="color-frame">
        <div id="color-box"></div>
      </div>
      <p>Emotone 결과 페이지입니다.</p>
    </div>

    


  `,
};

// 페이지 전환 함수
function navigate(page) {
  const content = document.getElementById("content");
  if (pages[page]) {
    content.innerHTML = pages[page];

    if (page === "measuring") {
      startProgressBar();
    } else if (page === "result") {
      displayResult();
    } 
  }
}

// 이름 입력 처리
function handleNameInput() {
  const nameInput = document.getElementById("name-input");
  if (nameInput) {
    userName = nameInput.value.trim();
    if (userName) {
      navigate("how-to-play");
    } else {
      alert("이름을 입력해주세요!");
    }
  }
}




// 진행 바 애니메이션
function startProgressBar() {
  const progress = document.querySelector(".progress");
  if (!progress) return;

  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      navigate("result");
    } else {
      width++;
      progress.style.width = width + "%";
    }
  }, 50);
}

// 결과 페이지 표시
function displayResult() {
  const resultTitle = document.getElementById("result-title");
  if (resultTitle) {
    resultTitle.textContent = `${userName}님의 Emotone`;
  }

  // 랜덤 그라데이션 생성
  const colors = setRandomGradientInFrame();
 

}

// 랜덤 색상 생성 함수
function getRandomColor() {
  const randomChannel = () => Math.floor(Math.random() * 256);
  return `rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`;
}

// 랜덤 그라데이션 프레임 설정
function setRandomGradientInFrame() {
  const colorBox = document.getElementById("color-box");
  if (!colorBox) {
    console.error("Error: #color-box element not found!");
    return;
  }

  const color1 = getRandomColor();
  const color2 = getRandomColor();

  console.log("Random Gradient Colors:", color1, color2); // 디버깅용 출력
  colorBox.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
}
