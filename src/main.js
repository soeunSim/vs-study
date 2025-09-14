// section02의 위치가 감지되면,
// 해당 컨텐츠의 자식 중 .item이 scroll을 타고 올라온다.
// 단, 감지 된 위치보다 스크롤 값이 작으면 scroll 타고 원위치로 내려간다.
// resize에도 내 위치에 따라 .item 위치가 결정 된다.

// (미션01) section02의 위치를 어떻게 감지할까?
// => 스크롤을 내렸을 때
// 문서에서부터 section02까지의 요소 시작점의 위치의 값과
// 내가 스크롤한 값이 일치할때 감지!

// (미션02) 감지 후 .item에게 scroll이벤트를 줘야한다.
// 스크롤한 값 - section02까지의 요소 시작점 

// 사용자가 스크롤을 내릴 때마다 문서 전체에서 스크롤된 높이(documentScrollTop)를 확인한다.
// 그리고 section02 요소가 문서 상단에서 얼마나 떨어져 있는지(sectionTwoOffsetTop)를 미리 계산해둔다.

// documentScrollTop - sectionTwoOffsetTop을 통해, 
// 내가 섹션 시작점에서 얼마나 더 스크롤했는지를 알 수 있다.
// 이 차이를 scrollDeltaFromSectionStart라고 한다.

// 이 값을 애니메이션이 진행될 길이(animationScrollRange)로 나누면 
// 0에서 1 사이의 진행률(scrollProgress)이 된다.
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

// 만약 화면 크기가 바뀌면(sectionTwoOffsetTop이나 viewportHeight 값이 달라질 수 있음), 
// 리사이즈 이벤트에서 다시 이 값을 계산해주어야 .item의 위치가 어긋나지 않는다.