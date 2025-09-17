// ⭐ MockData
const imgData = [
  { imgUrl: "https://images.mypetlife.co.kr/content/uploads/2023/04/18140421/AdobeStock_212879665-1024x670.jpeg", alt: "img1" },
  { imgUrl: "https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg", alt: "img2" },
  { imgUrl: "https://newsimg-hams.hankookilbo.com/2024/06/25/9b490f29-4415-43bb-bdf8-b77c3ca67413.jpg", alt: "img3" },
];
const btnDirectionData = [
  { direction : "이전", className: "prev"},
  { direction : "다음", className: "next"},
];

const areaSlide = document.querySelector('.area-slide');
const dataLength = imgData.length;

// 슬라이드 박스, 이미지 만드는 함수
function createSlideBox () {
  // 슬라이드 영역 박스
  const areaSlideBox = document.createElement("div");
  areaSlideBox.classList.add("js-box");
  areaSlide.appendChild(areaSlideBox);

  // 슬라이드 박스 안에 아이템 넣기
  for (let i = 0; i < dataLength; i++) {
    const { imgUrl, alt } = imgData[i];

    // item
    const newSlideItem = document.createElement("div");
    newSlideItem.classList.add("js-item");
    newSlideItem.dataset.index = i;

    // img
    const newSlideItemImg = document.createElement("img");
    newSlideItemImg.src = imgUrl; 
    newSlideItemImg.alt = alt;   

    // item 안에 img 넣기
    areaSlideBox.appendChild(newSlideItem);
    newSlideItem.appendChild(newSlideItemImg);
  }
}

// 슬라이드 방향 버튼 만드는 함수
function createSlideDirectionBtn () {
  // 슬라이드 버튼 박스
  const areaBtnBox = document.createElement("div");
  areaBtnBox.classList.add("js-btn-box");
  areaSlide.appendChild(areaBtnBox);

  for(let i = 0; i<btnDirectionData.length; i++) {
    const { direction, className } = btnDirectionData[i];
    // 슬라이드 방향 버튼
    const newBtn = document.createElement("button");
    newBtn.classList.add(className);
    newBtn.textContent = direction;
    newBtn.type = "button";

    areaBtnBox.appendChild(newBtn);
  }
}

// 슬라이드 네비게이터 만드는 함수
function createSlideNavigator() {
  const navigatorBox = document.createElement("div");
  navigatorBox.classList.add("js-navigator");
  areaSlide.appendChild(navigatorBox);

  for(let i = 0; i < imgData.length; i++) {
    const newNavBtn = document.createElement("button");
    newNavBtn.dataset['index'] = i;
    newNavBtn.textContent = `0` + (i + 1);    
    newNavBtn.type = "button";

    navigatorBox.appendChild(newNavBtn);
  }
}



// ⭐ 실행
window.onload = () => {
  // 슬라이드 이미지 생성 함수
  createSlideBox();
  // 슬라이드 이동방향 버튼 생성 함수
  createSlideDirectionBtn();
  // 슬라이드 네비게이터 생성 함수
  createSlideNavigator();

};
