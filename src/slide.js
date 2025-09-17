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
let currentIndex = 0;
let prevIndex = convertIndexLimit(currentIndex - 1);
let nextIndex = convertIndexLimit(currentIndex + 1);
let autoInterval = null;

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
function createSlideMoveBtn () {
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
    newBtn.addEventListener('click', () => slideBtnMoveEvent(className));
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

    newNavBtn.addEventListener('click', (event) => {
      const index = parseInt(event.currentTarget.dataset.index);
      slideNavigatorEvent(index);
    });
  }
}

// 슬라이드 네비게이터 click 시 해당 index로 이동하는 이벤트
function slideNavigatorEvent(index) {
  const isContainsAnimation = areaSlide.firstElementChild.classList.contains('--transition');

  if (isContainsAnimation !== null && index !== currentIndex) {
    // 애니메이션 시작
    areaSlide.firstElementChild.classList.add('--transition');
    prevIndex = currentIndex;
    currentIndex = index;
    nextIndex = currentIndex + 1 ;

    setSlideMoveClass();

    setTimeout(() => {
      // 애니메이션 제거
      areaSlide.firstElementChild.classList.remove('--transition');

      prevIndex = convertIndexLimit(currentIndex - 1);
      nextIndex = convertIndexLimit(currentIndex + 1);

      setSlideMoveClass();

      autoSlide();
    }, 500)
  }
}

// 슬라이드 인덱스 넘지 않도록 제어하는 함수
function convertIndexLimit(index) {
  const last = imgData.length - 1;
  if (index > last) {
    index = 0;
  }
  if (index < 0) {
    index = last;
  }

  return index;
}

// 인덱스에 따라 방향 class 를 부여하는 함수
function setSlideMoveClass() {
  const slideItemList = areaSlide.querySelectorAll('.js-item'); 
  
  if (slideItemList !== null) {
    Array.from(slideItemList).forEach((item, index) => {
      item.classList.remove('--active', '--prev', '--next');

      if (currentIndex === index) {
        item.classList.add('--active');
      }
      if (prevIndex === index) {
        item.classList.add('--prev');
      }
      if (nextIndex === index) {
        item.classList.add('--next');
      }      
    });
  }
}

// 버튼 방향에 따라 슬라이드를 이동하는 이벤트
function slideBtnMoveEvent(direction) {
  const isContainsAnimation = areaSlide.firstElementChild.classList.contains('--transition');
  const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

 // 애니메이션이 없다면 
  if (isContainsAnimation === false) {
    // 애니메이션 시작
    areaSlide.firstElementChild.classList.add('--transition');
    
    // 버튼 방향에 따른 frame 조정
    if (direction === 'next') {
      currentIndex = convertIndexLimit(targetIndex );
      prevIndex = convertIndexLimit(targetIndex - 1 ); 
      nextIndex = -1;

    } else if (direction === 'prev') {
      currentIndex = convertIndexLimit(targetIndex);
      nextIndex = convertIndexLimit(targetIndex + 1);
      prevIndex = -1;
    }

    setSlideMoveClass();

    setTimeout(() => {
      // 애니메이션 종료
      areaSlide.firstElementChild.classList.remove('--transition');

      nextIndex = convertIndexLimit(currentIndex + 1);
      prevIndex = convertIndexLimit(currentIndex - 1);

      setSlideMoveClass();

      autoSlide();
    }, 500);
  }

}

// 슬라이드 자동 재생 함수 
function autoSlide() {
  if (autoInterval !== null) {
    clearInterval(autoInterval);
  }

  // 3초 뒤 현재 인덱스가 + 1 된다.
  autoInterval = setInterval(() => {
      slideBtnMoveEvent('next');
  }, 3000);
}

// ⭐ 실행
window.onload = () => {
  // init();

  // 슬라이드 이미지 생성 함수
  createSlideBox();
  // 슬라이드 이동방향 버튼 생성 함수
  createSlideMoveBtn();
  // 슬라이드 네비게이터 생성 함수
  createSlideNavigator();

  // 슬라이드 animation class 생성 함수(초기실행)
  setSlideMoveClass();

  // 슬라이드 자동 재생 함수(초기실행)
  autoSlide();
};
