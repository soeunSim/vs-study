// 💡[바닐라 스크립트로 slide 구현]

// 초기 0번째 인덱스를 현재(active)로 설정해줍니다.
// 현재(active) slide를 제외한 이미지들은 뷰포트 바깥
// 즉, 화면 오른쪽 밖으로 정렬해 둡니다.
// 이어서 내가 가진 slide안의 이미지 갯수를 파악합니다.
// 그리고 현재(active) 기준으로 내 이전과 다음 item을 파악합니다.
// 사용자가 이전 버튼을 누른다면 현재기준으로 - 1 ,
// 사용자가 다음 버튼을 누른다면 현재 기준으로 + 1 이됩니다.

// 현재(active) 기준 이전 또는 다음으로 와야할 슬라이드가
// 음수값 또는 슬라이드 길이를 넘어서게 된다면
// 음수 값의 경우 슬라이드 길이의 마지막 슬라이드로
// 슬라이드의 길이를 넘을 경우 첫번째 슬라이드로 조정이 필요합니다.

// 하단 네비게이터의 경우 내가 가진 slide 안의 이미지 갯수 만큼 보여줍니다.
// 나열 되어있는 각 네비게이터를 click 시
// slide 안의 이미지 숫자(index)와 일치하는 이미지로 이동 되어야 합니다.

// 단, 이전(prev) 또는 다음(next) 중 어떤 버튼을 누를지 모르기 때문에
// 내가 누른 버튼 기준으로 이전(prev), 현재(active), 다음(next)의
// index 정리가 필요합니다.

// ⚠️ 애니메이션은 frame단위로 생각해야 합니다.
// [1] prev, next 일 경우 사용 되는 프레임은 2개
// => 사용 되는 프레임이 규칙적이기 때문이기때문입니다.

// [2] 네비게이션일 경우 사용 되는 프레임은 3개
// => 사용 되는 프레임이 규칙적이지 않기 때문이다.
// 다음 버튼을 누르면 현재(active)가 next로 이동하고
// prev가 현재(active)로 이동합니다.
// 이때 보여지는 애니메이션을 막기 위해 prev를 음수로 제어합니다.
// 때문에 최종 사용되는 frame 갯수는 총 3개를 사용합니다.

const slideList = document.querySelectorAll(".js-slide > .js-item");
const slideArea = document.querySelector(".js-slide");

let currentIndex = 0;
let prevIndex = convertIndexLimit(currentIndex - 1);
let nextIndex = convertIndexLimit(currentIndex + 1);

// 인덱스의 제한을 전환하는 함수
function convertIndexLimit(index) {
  const last = slideList.length - 1;
  if (index > last) {
    index = 0;
  }
  if (index < 0) {
    index = last;
  }

  return index;
}

// 슬라이드 내 각 아이템의 class를 세팅하는 함수
function setSlideItemClass() {
  slideList.forEach((element, index) => {
    element.classList.remove("--active", "--prev", "--next");

    if (index === currentIndex) {
      element.classList.add("--active");
    }

    if (index === prevIndex) {
      element.classList.add("--prev");
    }

    if (index === nextIndex) {
      element.classList.add("--next");
    }

  }); 
}

// 버튼 방향에 따라 현재를 변경하는 이벤트
function clickSlideEvent(direction) {
  // 애니메이션이 꺼진 상태라면
  if ( slideArea.classList.contains('--transition') === false) {
    // 현재인덱스는 어느 방향에서 변경되는지 :: next, prev => 현재도 나가야한다.
    const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    // 애니메이션 시작
    slideArea.classList.add('--transition');

    // 현재 이벤트 방향 기준 해당 방향 및 현재 방향의 인덱스 재계산
    if (direction === "next") {
      // 현재가 
      currentIndex = convertIndexLimit(targetIndex);
      prevIndex = convertIndexLimit(targetIndex - 1);  
      nextIndex = -1;      

    } else if (direction === "prev") {       
      currentIndex = convertIndexLimit(targetIndex);
      nextIndex = convertIndexLimit(targetIndex + 1);
      prevIndex = -1;
    }


    // 방향에 따른 class 세팅 시작
    // 애니메이션이 켜져있으면 transtion 이벤트 추가 포함
    setSlideItemClass(); 

    setTimeout(() => {

      // 애니메이션 종료 
      slideArea.classList.remove('--transition');

      // 애니메이션 종료 후 재 세팅
      nextIndex = convertIndexLimit(currentIndex + 1);
      prevIndex = convertIndexLimit(currentIndex - 1);

      setSlideItemClass(); 
      
    }, 500);
    console.log(currentIndex);
  }
}

window.onload = () => {
  setSlideItemClass();

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  prevButton.addEventListener("click", () => clickSlideEvent("prev"));
  nextButton.addEventListener("click", () => clickSlideEvent("next"));
};
