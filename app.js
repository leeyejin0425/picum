function navigateTo(url) {
    const body = document.querySelector("body");
  
    // 페이지 전환 전 페이드 아웃
    body.style.opacity = 0;
  
    setTimeout(() => {
      window.location.href = url; // 경로 이동
    }, 700); // 페이드 아웃 효과 후 이동
  }
  
  window.onload = () => {
    const body = document.querySelector("body");
    body.style.opacity = 1; // 페이지 로드 시 서서히 나타남
  };
  
  
  
  