// 페이지 콘텐츠 데이터
const pages = {
  main: `
    <div class="container">
      <h1>나만의 Emotone</h1>
      <p>Emotone은 감정을 색상과 소리로 표현하는 창의적인 시스템입니다.</p>
      <button id="explore-button" onclick="navigate('how-to-play')">나만의 Emotone 탐색하기</button>
    </div>
  `,
  about: `
    <div class="container">
      <h1>About Emotone</h1>
      <p>Emotone은 감정을 색상과 소리로 변환하는 창의적인 시스템입니다.</p>
    </div>
  `,
  how: `
    <div class="container">
      <h1>How to Play?</h1>
      <div class="image-section">
        <img src="free-icon-discussion-4766528.png" alt="Discussion Icon">
        <img src="free-icon-home-repair-4072135.png" alt="Home Repair Icon">
        <img src="free-icon-photo-2984403.png" alt="Photo Icon">
      </div>
      <p class="description">
        당신의 Emotone을 분석합니다.<br>
        당신 곁의 사람을 바라보거나, 좋아하는 것을 상상하기,<br>
        원하는 이미지를 준비해 주세요.
      </p>
      <button class="explore-btn" onclick="navigate('explore')">측정 시작</button>
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
        당신의 Emotone을 분석합니다.<br>
        당신 곁의 사람을 바라보거나, 좋아하는 것을 상상하기,<br>
        원하는 이미지를 준비해 주세요.
      </p>
      <button class="explore-btn" onclick="navigate('explore')">측정 시작</button>
    </div>
  `,
  explore: `
    <div class="container">
      <h1>Explore Emotone</h1>
      <p>Emotone을 찾는 중...</p>
    </div>
  `,
};

// 페이지 로드 함수
function navigate(page) {
  const content = document.getElementById("content");
  if (pages[page]) {
    // 콘텐츠를 동적으로 변경
    content.innerHTML = pages[page];
  }
}







  
  
  
  