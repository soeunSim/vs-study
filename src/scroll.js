// section02의 위치가 감지되면,
// 해당 컨텐츠의 자식 중 .item이 scroll을 타고 올라온다.
// 단, 감지 된 위치보다 스크롤 값이 작으면 scroll 타고 원위치로 내려간다.
// resize에도 내 위치에 따라 .item 위치가 결정 된다.

// 

const sectionTwoElement = document.querySelector('.area-section02');
const itemElement = sectionTwoElement.querySelector('.item');

// ⭐.item 위지를 변경시키는 이벤트
function updateItemPositionEvent() {
  const sectionRectangle = sectionTwoElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  // (미션01) section02의 위치를 어떻게 감지할까?
  // => 스크롤을 내렸을 때
  // 문서에서부터 section02까지의 요소 시작점의 위치의 값과
  // 내가 스크롤한 값이 일치할때 감지!
  const isSectionVisible = sectionRectangle.bottom > 0 && sectionRectangle.top < viewportHeight;
  console.log(isSectionVisible);
  console.log(isSectionVisible);

  // (미션02) 감지 후 .item에게 scroll이벤트를 줘야한다.
  // 스크롤한 값 - section02까지의 요소 시작점 

  // 사용자가 스크롤을 내릴 때마다 문서 전체에서 스크롤된 높이(documentScrollTop)를 확인한다.
  // 그리고 section02 요소가 문서 상단에서 얼마나 떨어져 있는지(sectionTwoOffsetTop)를 미리 계산해둔다.
  if (isSectionVisible === false) {
    // 뷰포트보다 section02 시작점이 클때, 화면 아래에서 아이템 숨김
    if (sectionRectangle.top >= viewportHeight) {
      itemElement.style.transform = 'translateY(100%)';
      console.log("bottom");
    }
    // 뷰포트보다 section02 끝점이 작을 때, 화면 위에서는 아이템 보여주기
    else if (sectionRectangle.bottom <= 0) {
      itemElement.style.transform = 'translateY(0%)';
      console.log("on");
    }
    return;        
  }
  // documentScrollTop - sectionTwoOffsetTop을 통해, 
  // 내가 섹션 시작점에서 얼마나 더 스크롤했는지를 알 수 있다.

  // 이 값을 애니메이션이 진행될 길이로 나누면 
  // 0에서 1 사이의 진행률이 된다.
  // 진행률이 0일 때는 아직 섹션에 도달하지 않은 상태이고, 
  // 이때 .item은 바닥 아래쪽에 있어야 한다.
  // 진행률이 1일 때는 섹션 애니메이션이 끝난 상태이므로 
  // .item은 완전히 올라온 위치(translateY 0%)에 머문다.

  // 즉, 진행률이 0과 1 사이일 때는 (1 - scrollProgress) * 100%만큼 translateY를 주어 
  // .item이 점점 올라오도록 한다.
  // (1 - scrollProgress) * 100% 의미,
  // 진행률이 0일 때 .item은 translateY(100%) → 바닥 밑에 숨기기
  // 진행률이 1일 때 .item은 translateY(0%) → 제자리까지 올라오기
  // => progress = 0 → (1 - 0) * 100 = 100 → translateY(100%)

  // 화면에 보이는 동안 진행률 계산
  const rawProgress = (viewportHeight - sectionRectangle.top) / (viewportHeight + sectionRectangle.height);
  const scrollProgress = clampNumber(rawProgress, 0, 1);
  const translatePercent = (1 - scrollProgress) * 100;
  itemElement.style.transform = `translateY(${translatePercent}%)`;
}

// 유틸함수, 
function clampNumber(number, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, number));
}

// 초기 실행
updateItemPositionEvent();


// ⭐ 미구현
// 만약 화면 크기가 바뀌면(sectionTwoOffsetTop이나 viewportHeight 값이 달라질 수 있음), 
// 리사이즈 이벤트에서 다시 이 값을 계산해주어야 .item의 위치가 어긋나지 않는다.